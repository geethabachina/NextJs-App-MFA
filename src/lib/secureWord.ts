import crypto from 'crypto';

type StoreEntry = {
  secureWord: string;
  issuedAt: number;
  lastRequested: number;
};

const store = new Map<string, StoreEntry>();
const SECRET = 'super_secret_key';

export function generateSecureWord(username: string) {
  const now = Date.now();
  const entry = store.get(username);

  // Rate limit: 1 request per 10 seconds
  if (entry && now - entry.lastRequested < 10_000) {
    throw new Error('Please wait before requesting again.');
  }

  // Generate secure word (HMAC of username + timestamp)
  const issuedAt = now;
  const secureWord = crypto
    .createHmac('sha256', SECRET)
    .update(username + issuedAt)
    .digest('hex')
    .slice(0, 8)
    .toUpperCase();

  // Save to store
  store.set(username, { secureWord, issuedAt, lastRequested: now });

  // Clean up expired entries
  for (const [user, data] of store.entries()) {
    if (now - data.issuedAt > 60_000) {
      store.delete(user);
    }
  }

  return { secureWord, expiresIn: 60 };
  
}
export function getSecureWordStore() {
  return store;
}