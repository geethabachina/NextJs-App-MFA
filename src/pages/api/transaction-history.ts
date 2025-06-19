import type { NextApiRequest, NextApiResponse } from 'next';

const transactions = [
  {
    date: '24 Aug 2023',
    referenceId: '#834343434342',
    to: 'Bloom Enterprise Sdn Bhd',
    toRef: 'Recipient references will go here',
    type: 'DuitNow payment',
    amount: 'RM 1,200.00',
  },
  {
    date: '14 Jul 2023',
    referenceId: '#834343434342',
    to: 'Muhammad Andy Asmarwi',
    toRef: 'Recipient references will go here...',
    type: 'DuitNow payment',
    amount: 'RM 54,810.16',
  },
  {
    date: '12 Jul 2023',
    referenceId: '#834343434342',
    to: 'Utilities Company Sdn Bhd',
    toRef: 'Recipient references will go here',
    type: 'DuitNow payment',
    amount: 'RM 100.00',
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(transactions);
}