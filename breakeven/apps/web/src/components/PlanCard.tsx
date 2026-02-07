import React from 'react';
import { PlanResult } from '@breakeven/shared';
import { ProgressBar } from './ProgressBar';
import { CategoryDeltaRow } from './CategoryDeltaRow';
import Link from 'next/link';

interface Props {
  plan: PlanResult;
}

export function PlanCard({ plan }: Props) {
  const savedPerMonth = plan.monthlySavings;
  return (
    <div className="card">
      <div className="flex" style={{ justifyContent: 'space-between' }}>
        <div className="badge">{plan.type}</div>
        <div className="small">Goal in {plan.monthsToGoal} mo</div>
      </div>
      <h3 style={{ margin: '12px 0' }}>$ {savedPerMonth.toFixed(0)} / month</h3>
      <p className="small">{plan.aiSummary}</p>
      <div style={{ margin: '12px 0' }}>
        <ProgressBar progress={Math.min(100, (plan.currentBuffer / plan.goalAmount) * 100)} />
        <div className="small" style={{ marginTop: 6 }}>
          Buffer: ${plan.currentBuffer.toFixed(0)} / ${plan.goalAmount.toFixed(0)}
        </div>
      </div>
      <div className="grid" style={{ gridTemplateColumns: '1fr' }}>
        {plan.deltasByCategory.slice(0, 3).map((delta) => (
          <CategoryDeltaRow key={delta.category} delta={delta} />
        ))}
      </div>
      <div style={{ marginTop: 12 }}>
        <Link className="button" href={`/plan?planId=${plan.planId}`}>
          View checklist
        </Link>
      </div>
    </div>
  );
}
