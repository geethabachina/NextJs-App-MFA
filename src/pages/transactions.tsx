import React, { useEffect, useState } from 'react';
// import Navbar from '../components/Navbar';

type Transaction = {
  date: string;
  referenceId: string;
  to: string;
  toRef: string;
  type: string;
  amount: string;
};

export default function TransactionsPage() {
  const [data, setData] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/transaction-history')
      .then(res => res.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* <Navbar /> */}
      <div style={{ maxWidth: 900, margin: '2rem auto', background: '#fff', borderRadius: 10, boxShadow: '0 2px 12px #0001', padding: '2rem' }}>
        <h2 style={{ marginBottom: 24 }}>Transaction History</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 15 }}>
            <thead>
              <tr style={{ background: '#f7f7f7', color: '#888', textAlign: 'left' }}>
                <th style={{ padding: '10px 8px' }}>Date</th>
                <th style={{ padding: '10px 8px' }}>Reference ID</th>
                <th style={{ padding: '10px 8px' }}>To</th>
                <th style={{ padding: '10px 8px' }}>Transaction Type</th>
                <th style={{ padding: '10px 8px', textAlign: 'right' }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: 24 }}>Loading...</td>
                </tr>
              ) : (
                data.map((tx, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #f0f0f0' }}>
                    <td style={{ padding: '10px 8px', color: '#444' }}>{tx.date}</td>
                    <td style={{ padding: '10px 8px', color: '#666' }}>{tx.referenceId}</td>
                    <td style={{ padding: '10px 8px' }}>
                      <div style={{ fontWeight: 500 }}>{tx.to}</div>
                      <div style={{ fontSize: 13, color: '#aaa' }}>{tx.toRef}</div>
                    </td>
                    <td style={{ padding: '10px 8px', color: '#2563eb', fontWeight: 500 }}>{tx.type}</td>
                    <td style={{ padding: '10px 8px', textAlign: 'right', fontWeight: 600 }}>{tx.amount}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}