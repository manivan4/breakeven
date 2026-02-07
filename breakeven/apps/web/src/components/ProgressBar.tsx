import React from 'react';

export function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="progress">
      <div className="progress-bar" style={{ width: `${Math.min(100, Math.max(progress, 0))}%` }} />
    </div>
  );
}
