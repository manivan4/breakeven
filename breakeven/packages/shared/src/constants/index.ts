export const MODES = ['BALANCE', 'SEPARATE', 'EXIT'] as const;
export const PLAN_TYPES = ['FAST', 'STEADY'] as const;
export const GOAL_TYPES = ['EXIT_BUFFER', 'PRIVATE_BUFFER', 'FAIRNESS'] as const;

export const DEFAULT_CATEGORIES = [
  'Housing',
  'Food',
  'Transport',
  'Utilities',
  'Health',
  'Debt',
  'Subscriptions',
  'Personal Care',
  'Entertainment',
  'Savings',
];

export const PLAN_RULES = {
  FAST: {
    cutPercent: 0.22,
    maxCategories: 6,
    joyPreserve: 0.05,
  },
  STEADY: {
    cutPercent: 0.12,
    maxCategories: 4,
    joyPreserve: 0.1,
  },
};
