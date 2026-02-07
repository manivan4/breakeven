# BreakEven

A calm, action-first relationship finance toolkit to help women split fairly, separate safely, or plan an exit with clear steps. Built as a weekend-ready monorepo with a Next.js frontend, Fastify API, and shared types.

## Apps
- `apps/web` – Next.js (App Router) UI with mode selection, plan generation, and checklist views.
- `apps/api` – Fastify service with Nessie demo connector, deterministic plan generation, and demo transactions.
- `packages/shared` – Types, constants, and zod validators shared by web + api.

## Getting started
```bash
cd breakeven
npm install           # installs workspaces
npm run dev           # runs api on :4000 and web on :3000
```

Environment variables live in `.env` (see `.env.example`).

## Key endpoints
- `POST /v1/plan/generate` – returns `{ fast, steady }` plans from spending + goal input.
- `GET /v1/plan/:planId` – fetch saved plan.
- `GET /v1/profile` – demo user.
- `GET /v1/transactions` – demo dataset (fallback when Nessie is down).
- `POST /v1/nessie/connect` – stubbed connector.

## UI flows
1) Landing → pick mode (Balance / Separate / Exit)
2) Fill goal + buffer + monthly spend → generate Fast + Steady plans
3) View plan checklist and category changes
4) Dashboard shows buffer progress + top three changes

## Notes
- Plan math is deterministic; AI is used only for summary copy (currently rule-based stub for offline reliability).
- Demo dataset is baked in; swap to real Nessie once keys are provided.
- Keep secrets server-side; never ship banking keys to the client.
