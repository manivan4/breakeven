'use client';
import React from 'react';
import Link from 'next/link';
import { Mode } from '@breakeven/shared';

interface Props {
  mode: Mode;
  title: string;
  copy: string;
  recommended?: boolean;
}

const modeColors: Record<Mode, string> = {
  BALANCE: '#38bdf8',
  SEPARATE: '#f59e0b',
  EXIT: '#10b981',
};

export function ModeCard({ mode, title, copy, recommended }: Props) {
  return (
    <Link href={`/mode?mode=${mode}`} className="card" style={{ borderColor: modeColors[mode] }}>
      <div className="flex" style={{ justifyContent: 'space-between' }}>
        <span className="badge" style={{ background: modeColors[mode], color: '#0f172a' }}>{mode}</span>
        {recommended && <span className="badge" style={{ background: 'rgba(255,255,255,0.12)' }}>Recommended</span>}
      </div>
      <h3 style={{ margin: '12px 0 6px' }}>{title}</h3>
      <p className="small">{copy}</p>
    </Link>
  );
}
