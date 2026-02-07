'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { fetchPlan } from '../../lib/api';
import { PlanResult } from '@breakeven/shared';
import { ChecklistItem } from '../../components/ChecklistItem';
import { CategoryDeltaRow } from '../../components/CategoryDeltaRow';
import { ProgressBar } from '../../components/ProgressBar';

export default function PlanPage() {
  const searchParams = useSearchParams();
  const planId = searchParams.get('planId');
  const [plan, setPlan] = useState<PlanResult | null>(null);

  useEffect(() => {
    if (planId) {
      fetchPlan(planId).then(setPlan);
    }
  }, [planId]);

  if (!plan) return <main className="container">Loading plan…</main>;

  return (
    <main className="container" style={{ display: 'grid', gap: 20 }}>
      <header className="flex" style={{ justifyContent: 'space-between' }}>
        <div>
          <p className="badge">{plan.type}</p>
          <h1 style={{ margin: '10px 0 6px' }}>Weekly checklist</h1>
          <p className="small">{plan.aiSummary}</p>
        </div>
      </header>

      <div className="card" style={{ display: 'grid', gap: 12 }}>
        <ProgressBar progress={Math.min(100, (plan.currentBuffer / plan.goalAmount) * 100)} />
        <div className="flex" style={{ justifyContent: 'space-between' }}>
          <div className="small">Buffer: ${plan.currentBuffer.toFixed(0)} / ${plan.goalAmount.toFixed(0)}</div>
          <div className="small">Months to goal: {plan.monthsToGoal}</div>
        </div>
      </div>

      <div className="card" style={{ display: 'grid', gap: 10 }}>
        <h3>Do this week</h3>
        {plan.weeklyChecklist.map((item, idx) => (
          <ChecklistItem item={item} key={idx} />
        ))}
      </div>

      <div className="card" style={{ display: 'grid', gap: 10 }}>
        <h3>Category changes</h3>
        {plan.deltasByCategory.map((delta) => (
          <CategoryDeltaRow key={delta.category} delta={delta} />
        ))}
      </div>
    </main>
  );
}
