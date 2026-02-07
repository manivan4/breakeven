const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000';

export async function fetchProfile() {
  const res = await fetch(`${API_BASE}/v1/profile`);
  return res.json();
}

export async function fetchPlans(planInput: any) {
  const res = await fetch(`${API_BASE}/v1/plan/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(planInput),
  });
  return res.json();
}

export async function fetchPlan(planId: string) {
  const res = await fetch(`${API_BASE}/v1/plan/${planId}`);
  return res.json();
}

export async function fetchTransactions() {
  const res = await fetch(`${API_BASE}/v1/transactions`);
  return res.json();
}
