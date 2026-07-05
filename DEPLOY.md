# Guide de Déploiement - Service France Expert

## Architecture

- **Frontend** : Application React/Vite (`artifacts/service-france-expert`)
- **Backend** : API Express (`artifacts/api-server`)
- **Base de données** : PostgreSQL (via Drizzle ORM) ou stockage JSON local

## Prérequis

- Node.js 18+
- pnpm 9+

## Déploiement sans Base de Données (Développement/Prototypage)

Le projet fonctionne actuellement avec un stockage JSON local pour les leads. Aucune base de données n'est requise.

### Étapes

1. **Build du frontend**

   ```bash
   cd artifacts/service-france-expert
   pnpm install
   pnpm run build
   ```

2. **Build du backend**

   ```bash
   cd artifacts/api-server
   pnpm install
   pnpm run build
   ```

3. **Variables d'environnement**
   Créez `.env` dans `artifacts/api-server/` :

   ```
   PORT=5000
   DATABASE_URL= (optionnel si vous utilisez le storage JSON)
   ```

4. **Démarrage**

   ```bash
   # Terminal 1 - API
   cd artifacts/api-server
   pnpm run start

   # Terminal 2 - Frontend
   cd artifacts/service-france-expert
   pnpm run serve
   ```

## Déploiement avec PostgreSQL (Production)

Pour utiliser PostgreSQL en production :

1.  **Provisionner une base PostgreSQL**
    - Configurez `DATABASE_URL` avec la chaîne de connexion
    - Exemple : `postgresql://user:password@host:5432/database`

2.  **Appliquer le schéma**

    ```bash
    cd lib/db
    pnpm install
    pnpm run push  # Applique les migrations
    ```

3.  **Adapter les routes API** pour utiliser la DB au lieu du `local-store`

## Variables d'Environnement

| Variable       | Description                 | Requis                |
| -------------- | --------------------------- | --------------------- |
| `PORT`         | Port du serveur API         | Non (défaut: 5000)    |
| `DATABASE_URL` | URL de connexion PostgreSQL | Non (si storage JSON) |

## Structure des Artifacts

```
artifacts/
├── api-server/     # Backend Express (port configurable)
└── service-france-expert/  # Frontend Vite+React
```

## Déploiement avec Docker

```bash
# 1. Copier les variables d'environnement
cp .env.example .env

# 2. Démarrer avec Docker Compose
docker-compose up -d
```

Services exposés :

- API : http://localhost:5000
- Frontend : http://localhost:4173
- PostgreSQL : localhost:5432

## Protection de l'interface admin

L'interface `/admin` est protégée par mot de passe. Configurez `VITE_ADMIN_PASSWORD` dans votre environnement.

### Configuration

- Variable environnement Vite : `VITE_ADMIN_PASSWORD` (défaut: `admin123`)
- La variable doit être définie lors du build ou dans `.env`

### Build avec mot de passe personnalisé

```bash
# .env.local ou .env
VITE_ADMIN_PASSWORD=monmotdepassesecure

pnpm --filter @workspace/service-france-expert run build
```

## Notes

- Le frontend et backend sont séparés : déployer sur deux services ou un monorepo
- CORS est activé par défaut sur l'API - à sécuriser en production avec origine spécifique
