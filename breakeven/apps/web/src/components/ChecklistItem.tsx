import React from 'react';
import { PlanChecklistItem } from '@breakeven/shared';

export function ChecklistItem({ item }: { item: PlanChecklistItem }) {
  return (
    <div className="flex" style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <div className="flex" style={{ alignItems: 'flex-start' }}>
        <input type="checkbox" checked={item.done} readOnly style={{ marginTop: 3 }} />
        <div>
          <div>{item.label}</div>
          {item.rationale && <div className="small">{item.rationale}</div>}
        </div>
      </div>
    </div>
  );
}
