import type { NextApiRequest, NextApiResponse } from 'next';
import { getSecureWordStore } from '../../lib/secureWord';

const USERS = [
  // Example user: password is "password" hashed with SHA-256
  { username: 'testuser', hashedPassword: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8' }
];

function generateMockToken(username: string) {
  // Simple mock token (not a real JWT)
  return Buffer.from(`${username}:${Date.now()}`).toString('base64');
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { username, hashedPassword, secureWord } = req.body;
  if (!username || !hashedPassword || !secureWord) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  // Validate user
  const user = USERS.find(u => u.username === username && u.hashedPassword === hashedPassword);
  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  // Validate secure word
  const store = getSecureWordStore();
  const entry = store.get(username);
  console.log('Secure word store in login:', store);
  console.log('Entry for user:', entry);
  if (!entry) {
    return res.status(401).json({ message: 'No secure word issued for this user' });
  }
  if (entry.secureWord !== secureWord) {
    return res.status(401).json({ message: 'Invalid secure word' });
  }
  if (Date.now() - entry.issuedAt > 60_000) {
    return res.status(401).json({ message: 'Secure word expired' });
  }
  // Success: return mock token
  const token = generateMockToken(username);
  return res.status(200).json({ token });
}