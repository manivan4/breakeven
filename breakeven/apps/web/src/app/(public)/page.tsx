import { ModeCard } from '../../components/ModeCard';
import { PrivacyNoticeBanner } from '../../components/PrivacyNoticeBanner';

export default function Home() {
  return (
    <main className="container" style={{ display: 'grid', gap: 24 }}>
      <header>
        <p className="badge">BreakEven</p>
        <h1 style={{ margin: '12px 0 6px' }}>A calm plan for financial freedom</h1>
        <p className="small">Action-first toolkit to split fairly, build a personal buffer, or plan an exit safely.</p>
      </header>

      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
        <ModeCard
          mode="BALANCE"
          title="Balance: fairness check"
          copy="See yours vs ours and get a split that feels fair."
        />
        <ModeCard
          mode="SEPARATE"
          title="Separate: personal buffer"
          copy="Route money to your own buffer while keeping bills steady."
          recommended
        />
        <ModeCard
          mode="EXIT"
          title="Exit: move-out runway"
          copy="Timeline, savings, and weekly steps to leave safely."
        />
      </div>

      <PrivacyNoticeBanner />
    </main>
  );
}
