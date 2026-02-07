import { PLAN_RULES, DEFAULT_CATEGORIES, PlanInput, PlanResult, PlanDelta, PlanChecklistItem } from '@breakeven/shared';
import { v4 as uuid } from 'uuid';

function getTopCategories(spend: Record<string, number>, max: number, joyPreserve: number): PlanDelta[] {
  const entries = Object.entries(spend).filter(([, v]) => v > 0);
  const sorted = entries.sort((a, b) => b[1] - a[1]).slice(0, max);
  return sorted.map(([category, value]) => ({
    category,
    before: value,
    after: Math.max(0, value * (1 - joyPreserve)),
  }));
}

function applyCuts(deltas: PlanDelta[], cutPercent: number): PlanDelta[] {
  return deltas.map((d) => ({ ...d, after: Math.max(0, d.before * (1 - cutPercent)) }));
}

function buildChecklist(deltas: PlanDelta[]): PlanChecklistItem[] {
  return deltas.slice(0, 4).map((d) => ({
    label: `Cap ${d.category} at $${d.after.toFixed(0)} this month`,
    done: false,
    rationale: `Saves $${(d.before - d.after).toFixed(0)} without cutting essentials.`,
  }));
}

function summarize(mode: PlanInput['mode'], type: 'FAST' | 'STEADY', monthlySavings: number, monthsToGoal: number): string {
  const tone = type === 'FAST' ? 'shortest timeline' : 'gentler pace';
  const modeLine = mode === 'EXIT' ? 'moving fund ready' : mode === 'SEPARATE' ? 'personal buffer' : 'fair split cushion';
  return `${type} keeps you on a ${tone} with ~$${monthlySavings.toFixed(0)} freed each month to reach your ${modeLine} in ${monthsToGoal} months.`;
}

export function generatePlan(input: PlanInput, type: 'FAST' | 'STEADY'): PlanResult {
  const rules = PLAN_RULES[type];
  const totalSpend = Object.values(input.monthlySpendByCategory).reduce((a, b) => a + b, 0);
  const need = Math.max(0, input.goalAmount - input.currentBuffer);
  const baseDeltas = getTopCategories(input.monthlySpendByCategory, rules.maxCategories, rules.joyPreserve);
  const cutDeltas = applyCuts(baseDeltas, rules.cutPercent);

  const monthlySavings = cutDeltas.reduce((sum, d, idx) => {
    const before = baseDeltas[idx]?.before ?? 0;
    return sum + (before - d.after);
  }, 0);

  const monthsToGoal = monthlySavings > 0 ? Math.max(1, Math.ceil(need / monthlySavings)) : Infinity;
  const planId = `${type.toLowerCase()}-${uuid()}`;

  return {
    planId,
    householdId: 'demo-household',
    type,
    monthlySavings,
    monthsToGoal: Number.isFinite(monthsToGoal) ? monthsToGoal : 0,
    deltasByCategory: cutDeltas,
    weeklyChecklist: buildChecklist(cutDeltas),
    aiSummary: summarize(input.mode, type, monthlySavings, Number.isFinite(monthsToGoal) ? monthsToGoal : 0),
    need,
    goalAmount: input.goalAmount,
    currentBuffer: input.currentBuffer,
    createdAt: new Date().toISOString(),
  };
}

export function mergePlans(fast: PlanResult, steady: PlanResult) {
  return { fast, steady };
}
