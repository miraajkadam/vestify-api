# Vestify API

A fully-typed Node.js/TypeScript REST back-end for Vestify – complete with
authentication, Prisma ORM, Swagger docs and an opinionated DevEx.

## ✨ Features
| Area | What you get |
|------|--------------|
| **Typed ORM** | [Prisma](https://www.prisma.io/) with migration & seeding workflow |
| **Auth** | Local-strategy login/signup (`passport`, `bcrypt`) + stateless JWTs |
| **API Docs** | Auto-generated **Swagger UI** at `/api-docs` and Redoc-style docs at `/docs` |
| **Clean structure** | Express routers → service layer → data access for `user`, `account`, `project`, `vc` resources |
| **Dev ergonomics** | Hot-reload (`nodemon`), path aliases (`@/…`), ESLint + Prettier |
| **Deployment ready** | Procfile, Node 20 engine field and a `postdeploy` prisma-migrate hook |

## 🗄️ Tech stack
* **Runtime** – Node 20, Express 4  
* **Language** – TypeScript 5, strict mode  
* **Database** – PostgreSQL (any SQL URL in `DATABASE_URL` works)  
* **ORM** – Prisma 6  
* **Auth** – Passport, JSON Web Tokens, Express-session  
* **Docs** – swagger-jsdoc + swagger-ui-express + @scalar/express-api-reference

## 🚀 Quick start

```bash
# 1. Clone & install
git clone https://github.com/miraajkadam/vestify-api.git
cd vestify-api
pnpm install          # or npm / yarn

# 2. Configure env
cp .env.local .env    # edit DATABASE_URL, JWT_SECRET, etc.

# 3. Run migrations & seed data
pnpm prisma:migrate
pnpm prisma:seed      # optional

# 4. Start the dev server
pnpm dev
# → http://localhost:3000/health       (basic ping)
# → http://localhost:3000/api-docs     (Swagger UI)
