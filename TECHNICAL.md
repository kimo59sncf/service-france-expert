# Documentation Technique - Service France Expert

## Stack Technique

### Frontend (`artifacts/service-france-expert`)

- **Framework** : React 18 + Vite
- **Routing** : Wouter
- **UI** : TailwindCSS + composants Radix UI personnalisés
- **State** : TanStack Query
- **Formulaires** : React Hook Form + Zod
- **Icons** : Lucide React

### Backend (`artifacts/api-server`)

- **Framework** : Express 5
- **Base de données** : PostgreSQL via Drizzle ORM
- **Logging** : Pino + pino-http
- **CORS** : activé globalement

### Libs partagées

- `@workspace/db` : Schémas Drizzle + types
- `@workspace/api-zod` : Schémas API Zod
- `@workspace/api-client-react` : Hooks React générés

## API Endpoints

| Méthode | Route            | Description           |
| ------- | ---------------- | --------------------- |
| `GET`   | `/api/services`  | Liste des services    |
| `GET`   | `/api/faq`       | Questions fréquentes  |
| `GET`   | `/api/leads`     | Liste des leads       |
| `POST`  | `/api/leads`     | Créer un lead         |
| `PATCH` | `/api/leads/:id` | Mettre à jour un lead |

## Schéma Services (DB)

```typescript
services {
  id: serial (PK)
  title: text
  description: text
  category: text
  icon: text
  price: text (nullable)
  duration: text (nullable)
  featured: boolean
}
```

## Stockage Actuel

Les données sont stockées dans `artifacts/api-server/data/leads.json`. Le schema DB existe mais n'est pas encore utilisé en production.

## Build

```bash
# Monorepo - build complet
pnpm run build

# Typecheck
pnpm run typecheck
```

## Ports par Défaut

- API : 5000
- Frontend (dev) : 5173
- Frontend (preview) : 4173
