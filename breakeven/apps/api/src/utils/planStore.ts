import { PlanResult } from '@breakeven/shared';

const store = new Map<string, PlanResult>();

export function savePlan(plan: PlanResult) {
  store.set(plan.planId, plan);
}

export function getPlan(planId: string) {
  return store.get(planId);
}

export function saveBundle(plans: PlanResult[]) {
  plans.forEach(savePlan);
}
