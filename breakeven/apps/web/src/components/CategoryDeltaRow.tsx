import React from 'react';
import { PlanDelta } from '@breakeven/shared';

export function CategoryDeltaRow({ delta }: { delta: PlanDelta }) {
  const savings = delta.before - delta.after;
  return (
    <div className="flex" style={{ justifyContent: 'space-between' }}>
      <div>
        <div>{delta.category}</div>
        <div className="small">${delta.before.toFixed(0)} → ${delta.after.toFixed(0)}</div>
      </div>
      <div className="badge" style={{ background: 'rgba(16,185,129,0.15)', color: '#10b981' }}>Save ${savings.toFixed(0)}</div>
    </div>
  );
}
