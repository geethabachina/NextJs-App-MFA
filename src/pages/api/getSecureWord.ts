import type { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';
import { getSecureWordStore } from '../../lib/secureWord';

const SECRET = 'super_secret_key';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { username } = req.body;
  if (!username) {
    return res.status(400).json({ message: 'Username required' });
  }

  const store = getSecureWordStore();
  const now = Date.now();
  const entry = store.get(username);

  // Rate limit: 1 request per 10 seconds
  if (entry && now - entry.lastRequested < 10_000) {
    return res.status(429).json({ message: 'Please wait before requesting again.' });
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
  console.log('Secure word store:', store);

  // Clean up expired entries
  Array.from(store.entries()).forEach(([user, data]) => {
    if (now - data.issuedAt > 60_000) {
      store.delete(user);
    }
  });

  return res.status(200).json({ secureWord, expiresIn: 60 });
}