'use client';
import { useEffect, useState } from 'react';
import { fetchTransactions } from '../../lib/api';
import { ProgressBar } from '../../components/ProgressBar';

export default function DashboardPage() {
  const [buffer, setBuffer] = useState(600);
  const goal = 3000;
  const [top3, setTop3] = useState<{ category: string; amount: number }[]>([]);

  useEffect(() => {
    fetchTransactions().then((data) => {
      const grouped: Record<string, number> = {};
      data.transactions.forEach((t: any) => {
        if (t.amount <= 0) return;
        grouped[t.category] = (grouped[t.category] || 0) + t.amount;
      });
      const sorted = Object.entries(grouped)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([category, amount]) => ({ category, amount }));
      setTop3(sorted);
    });
  }, []);

  return (
    <main className="container" style={{ display: 'grid', gap: 20 }}>
      <header className="flex" style={{ justifyContent: 'space-between' }}>
        <div>
          <p className="badge">Dashboard</p>
          <h1 style={{ margin: '10px 0 6px' }}>Your runway snapshot</h1>
          <p className="small">Top spend and buffer progress at a glance.</p>
        </div>
      </header>

      <div className="card" style={{ display: 'grid', gap: 10 }}>
        <ProgressBar progress={(buffer / goal) * 100} />
        <div className="flex" style={{ justifyContent: 'space-between' }}>
          <div className="small">Buffer: ${buffer} / ${goal}</div>
          <div className="small">Fast plan: 6 mo · Steady plan: 10 mo (demo)</div>
        </div>
      </div>

      <div className="card" style={{ display: 'grid', gap: 10 }}>
        <h3>Top 3 changes</h3>
        {top3.map((item) => (
          <div className="flex" key={item.category} style={{ justifyContent: 'space-between' }}>
            <span>{item.category}</span>
            <span className="badge">${item.amount.toFixed(0)}</span>
          </div>
        ))}
      </div>
    </main>
  );
}
