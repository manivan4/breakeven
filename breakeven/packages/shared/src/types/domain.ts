export type Mode = 'BALANCE' | 'SEPARATE' | 'EXIT';
export type PlanType = 'FAST' | 'STEADY';
export type GoalType = 'EXIT_BUFFER' | 'PRIVATE_BUFFER' | 'FAIRNESS';

export interface User {
  userId: string;
  email?: string;
  mode: Mode;
  householdId: string;
  preferences?: {
    defaultPlan?: PlanType;
  };
}

export interface Household {
  householdId: string;
  members: string[];
  sharedRules?: {
    oursPercent?: number;
    minePercent?: number;
  };
}

export interface AccountLink {
  accountLinkId: string;
  provider: 'NESSIE' | 'DEMO';
  providerAccountId: string;
  nickname?: string;
}

export interface Transaction {
  transactionId: string;
  householdId: string;
  accountLinkId: string;
  amount: number; // positive for spend, negative for income in this simplified model
  merchant: string;
  category: string;
  timestamp: string; // ISO string
}

export interface Goal {
  goalId: string;
  householdId: string;
  type: GoalType;
  targetAmount: number;
  currentBuffer?: number;
  deadline?: string; // ISO date
  createdAt: string;
  updatedAt: string;
}

export interface PlanDelta {
  category: string;
  before: number;
  after: number;
}

export interface PlanChecklistItem {
  label: string;
  done: boolean;
  rationale?: string;
}

export interface Plan {
  planId: string;
  householdId: string;
  type: PlanType;
  monthlySavings: number;
  monthsToGoal: number;
  deltasByCategory: PlanDelta[];
  weeklyChecklist: PlanChecklistItem[];
  aiSummary: string;
  createdAt: string;
}

export interface Recommendation {
  planId: string;
  text: string;
}

export interface PlanInput {
  mode: Mode;
  goalAmount: number;
  currentBuffer: number;
  monthlyIncome: number;
  monthlySpendByCategory: Record<string, number>;
}

export interface PlanResult extends Plan {
  need: number;
  goalAmount: number;
  currentBuffer: number;
}
