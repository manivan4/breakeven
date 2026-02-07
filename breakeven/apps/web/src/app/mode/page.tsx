'use client';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { fetchPlans, fetchTransactions } from '../../lib/api';
import { PlanCard } from '../../components/PlanCard';
import { PlanResult } from '@breakeven/shared';

export default function ModePage() {
  const searchParams = useSearchParams();
  const mode = (searchParams.get('mode') || 'SEPARATE').toUpperCase() as 'BALANCE' | 'SEPARATE' | 'EXIT';
  const [goal, setGoal] = useState(3000);
  const [buffer, setBuffer] = useState(600);
  const [income, setIncome] = useState(3800);
  const [plans, setPlans] = useState<{ fast?: PlanResult; steady?: PlanResult }>({});
  const [loading, setLoading] = useState(false);

  const [spendByCategory, setSpendByCategory] = useState<Record<string, number>>({
    Housing: 1200,
    Food: 420,
    Transport: 160,
    Subscriptions: 95,
    Entertainment: 260,
  });

  useEffect(() => {
    fetchTransactions().then((data) => {
      if (!data?.transactions) return;
      const grouped: Record<string, number> = {};
      data.transactions.forEach((t: any) => {
        if (t.amount <= 0) return; // skip income in this simple model
        grouped[t.category] = (grouped[t.category] || 0) + t.amount;
      });
      setSpendByCategory(grouped);
    });
  }, []);

  async function handleGenerate() {
    setLoading(true);
    const payload = {
      mode,
      goalAmount: goal,
      currentBuffer: buffer,
      monthlyIncome: income,
      monthlySpendByCategory: spendByCategory,
    };
    const data = await fetchPlans(payload);
    setPlans({ fast: data.fast, steady: data.steady });
    setLoading(false);
  }

  const spendKeys = useMemo(() => Object.keys(spendByCategory), [spendByCategory]);

  return (
    <main className="container" style={{ display: 'grid', gap: 16 }}>
      <header className="flex" style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <p className="badge">Mode: {mode}</p>
          <h1 style={{ margin: '12px 0 6px' }}>Set your target</h1>
          <p className="small">One form, two plans: Fast (shortest) and Steady (lower burnout).</p>
        </div>
        <button className="button" onClick={handleGenerate} disabled={loading}>
          {loading ? 'Generating…' : 'Generate plans'}
        </button>
      </header>

      <div className="card" style={{ display: 'grid', gap: 12 }}>
        <div className="flex" style={{ gap: 20, flexWrap: 'wrap' }}>
          <Field label="Goal amount ($)">
            <input type="number" value={goal} onChange={(e) => setGoal(Number(e.target.value))} />
          </Field>
          <Field label="Current buffer ($)">
            <input type="number" value={buffer} onChange={(e) => setBuffer(Number(e.target.value))} />
          </Field>
          <Field label="Monthly income ($)">
            <input type="number" value={income} onChange={(e) => setIncome(Number(e.target.value))} />
          </Field>
        </div>
        <div>
          <p className="small" style={{ marginBottom: 8 }}>Spending by category (edit to adjust)</p>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))' }}>
            {spendKeys.map((key) => (
              <Field key={key} label={key}>
                <input
                  type="number"
                  value={spendByCategory[key]}
                  onChange={(e) => setSpendByCategory({ ...spendByCategory, [key]: Number(e.target.value) })}
                />
              </Field>
            ))}
          </div>
        </div>
      </div>

      {plans.fast || plans.steady ? (
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          {plans.fast && <PlanCard plan={plans.fast} />}
          {plans.steady && <PlanCard plan={plans.steady} />}
        </div>
      ) : (
        <div className="card small">No plan yet. Fill the form and hit Generate.</div>
      )}
    </main>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label style={{ display: 'grid', gap: 6, fontSize: 14 }}>
      <span className="small">{label}</span>
      {children}
      <style jsx>{`
        input {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          padding: 10px;
          color: white;
        }
        input:focus { outline: 1px solid #f59e0b; }
      `}</style>
    </label>
  );
}
