import { z } from 'zod';
import { MODES, PLAN_TYPES } from '../constants';

export const planInputSchema = z.object({
  mode: z.enum(MODES),
  goalAmount: z.number().positive(),
  currentBuffer: z.number().nonnegative().default(0),
  monthlyIncome: z.number().nonnegative(),
  monthlySpendByCategory: z.record(z.string(), z.number().nonnegative()),
});

export const planResponseSchema = z.object({
  planId: z.string(),
  type: z.enum(PLAN_TYPES),
  monthlySavings: z.number(),
  monthsToGoal: z.number(),
  aiSummary: z.string(),
});
