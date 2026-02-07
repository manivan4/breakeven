# BreakEven API

Base URL: `http://localhost:4000`

## Auth
None for MVP; demo-only. Add session or token later.

## Endpoints

### GET /v1/health
Health probe.

### GET /v1/profile
Returns demo user profile.

### POST /v1/nessie/connect
Simulated connector for Nessie.
- Response: `{ accountLinkId, provider, status, message }`

### GET /v1/transactions
Returns demo transactions dataset. Query `mode` reserved for future filtering.
- Response: `{ transactions: Transaction[], source: 'demo' }`

### POST /v1/plan/generate
Generates Fast + Steady plans from input.
- Body (zod schema):
```json
{
  "mode": "BALANCE" | "SEPARATE" | "EXIT",
  "goalAmount": number,
  "currentBuffer": number,
  "monthlyIncome": number,
  "monthlySpendByCategory": { "Food": number, ... }
}
```
- Response: `{ fast: PlanResult, steady: PlanResult }`

### GET /v1/plan/:planId
Returns a previously generated plan by id.

## Types (key fields)
- `PlanResult`: `{ planId, type, monthlySavings, monthsToGoal, deltasByCategory[], weeklyChecklist[], aiSummary, need, goalAmount, currentBuffer, createdAt }`

## Validation
- Input validated via zod (`planInputSchema` in `@breakeven/shared`).
- Plan math is deterministic; AI is only for summaries (stubbed for offline use).

## Rate limiting
Not enabled in stub. Add Fastify rate-limit or an API gateway in production.
