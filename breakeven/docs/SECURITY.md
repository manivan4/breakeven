# Security & Privacy (MVP)

- Treat as finance-adjacent: never expose secrets client-side.
- Store `NESSIE_API_KEY` and `OPENROUTER_API_KEY` only on the server (.env).
- Demo mode is default; no real credentials should be entered.
- Logging: avoid storing full transaction payloads; current stub logs only Fastify request meta.
- CORS: open for local dev; tighten to allowed origins for production.
- Input validation: zod on plan generation.
- Rate limiting: add Fastify rate-limit before production launch.
- Data at rest: no database in stub; add MongoDB with collections `users`, `households`, `transactions`, `goals`, `plans` when persisting.
- Safety UI: PrivacyNoticeBanner reminds users data is simulated and not financial advice.
