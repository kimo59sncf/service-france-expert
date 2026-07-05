# Service France Expert

Application d'accompagnement administratif pour les démarches de titre de séjour, naturalisation et régularisation en France.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm --filter @workspace/service-france-expert run dev` — run frontend (port 5173)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages

## Stack

- pnpm workspaces, Node.js 20, TypeScript 5.9
- API: Express 5
- Frontend: React 18 + Vite
- UI: TailwindCSS + Radix UI
- DB: PostgreSQL + Drizzle ORM (optionnel, stockage JSON local actuellement)
- Validation: Zod, React Hook Form

## Where things live

- `artifacts/api-server/` — Backend API Express
- `artifacts/api-server/src/routes/` — Endpoints API (services, faq, leads)
- `artifacts/api-server/src/lib/local-store.ts` — Stockage JSON local des leads
- `artifacts/service-france-expert/src/pages/` — Pages frontend (services.tsx, faq.tsx, home.tsx, etc.)
- `lib/db/src/schema/` — Schémas Drizzle ORM

## Product

- Présentation des services d'accompagnement administratif
- FAQ détaillée sur titres de séjour, naturalisation, régularisation
- Formulaire de contact et prise de rendez-vous
- Gestion des leads (formulaires)

## Gotchas

- Le projet utilise actuellement un stockage JSON local (`artifacts/api-server/data/leads.json`)
- Pour passer à PostgreSQL : configurer DATABASE_URL et adapter `local-store.ts`
- pnpm requis pour l'installation des dépendances
