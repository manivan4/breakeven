import React from 'react';

export function PrivacyNoticeBanner() {
  return (
    <div className="card" style={{ border: '1px dashed rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.04)' }}>
      <div className="flex">
        <span className="badge" style={{ background: 'rgba(255,255,255,0.15)' }}>Privacy</span>
        <div className="small">This uses simulated data (Nessie demo). Do not enter real bank credentials. Not financial advice.</div>
      </div>
    </div>
  );
}
