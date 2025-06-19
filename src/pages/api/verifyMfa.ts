import type { NextApiRequest, NextApiResponse } from 'next';
import { generateMfaCode } from '../../lib/mfa';

type AttemptEntry = {
  attempts: number;
  locked: boolean;
  lastAttempt: number;
};

const ATTEMPT_LIMIT = 3;
const ATTEMPT_WINDOW = 10 * 60 * 1000; // 10 minutes

// In-memory store: username -> { attempts, locked, lastAttempt }
const attemptStore = new Map<string, AttemptEntry>();

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { username, code } = req.body;
  if (!username || !code) {
    return res.status(400).json({ message: 'Username and code are required' });
  }

  // For demo: use username as secret (in real apps, use per-user secret)
//   const secret = username + '-secret-key';
  const secret = 'user-secret-key';
  
  const validCode = generateMfaCode(secret);

  // Get or create attempt entry
  let entry = attemptStore.get(username);
  const now = Date.now();

  if (!entry) {
    entry = { attempts: 0, locked: false, lastAttempt: now };
    attemptStore.set(username, entry);
  }

  // Reset attempts if window expired
  if (now - entry.lastAttempt > ATTEMPT_WINDOW) {
    entry.attempts = 0;
    entry.locked = false;
  }

  entry.lastAttempt = now;

  if (entry.locked) {
    return res.status(403).json({ message: 'Account locked due to too many failed attempts.' });
  }

  if (code === validCode) {
    entry.attempts = 0; // reset on success
    return res.status(200).json({ success: true });
  } else {
    entry.attempts += 1;
    if (entry.attempts >= ATTEMPT_LIMIT) {
      entry.locked = true;
      return res.status(403).json({ message: 'Account locked due to too many failed attempts.' });
    }
    return res.status(401).json({ message: `Invalid code. Attempts left: ${ATTEMPT_LIMIT - entry.attempts}` });
  }
}