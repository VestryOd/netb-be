# netb-be

Backend for a frontend-interview preparation app ("Front interview quiz API"): a catalogue of
theory questions and practice tasks per discipline (currently JavaScript) and personal quizzes
generated from them.

Built with **Node.js + Express + TypeScript + MongoDB (Mongoose)**.

## What this project demonstrates

- Layered Express architecture: routes → validators → controllers → services → db layer.
- JWT authentication with short-lived access token and refresh token in an `httpOnly` cookie.
- Role-based access control (`user`, `student`, `teacher`, `admin`) with role levels stored in the DB.
- Request validation with Joi (`express-joi-validation`) and centralized error handling.
- Mongoose models + MongoDB aggregation pipelines (random sampling for quiz generation, joins for responses).
- Rich content model: a theory item is a list of ordered content blocks (`text`, `code`, `table`, `list`) with optional images.
- Image upload to AWS S3 (SDK v3) — one public bucket per discipline.
- OpenAPI 3 documentation generated from JSDoc (`swagger-jsdoc` + Swagger UI).
- Winston logging, uniform paginated responses with metadata, Docker image, conventional commits (commitlint).
- A seed script that populates the DB (roles, disciplines, root user, theory, practice, content with images).

## Tech stack

| Area           | Tools                                                                 |
| -------------- | --------------------------------------------------------------------- |
| Runtime / lang | Node.js 18, TypeScript 4.7                                            |
| HTTP           | Express 4, cors, cookie-parser, express-fileupload                    |
| Database       | MongoDB, Mongoose 6                                                   |
| Auth           | jsonwebtoken, bcrypt, jwt-decode                                      |
| Validation     | Joi, express-joi-validation                                           |
| Storage        | AWS S3 (`@aws-sdk/client-s3` v3)                                      |
| Docs           | swagger-jsdoc, swagger-ui-express                                     |
| Logging        | winston, express-winston                                              |
| Tooling        | ESLint, Prettier, commitlint (conventional commits), nodemon, Docker  |

## Installation process
- before installation run: ``before:module_alias``. It cleans aliases
- after install/uninstall packages run ``after:module_alias``. It adds aliases.
- In case of first ``npm install`` from scratch - just run ``after:module_alias`` after it.

All these manipulations needed for ensure that the main work folder will not be removed. Starting npm v7 sometimes this issue occurs.

## Getting started

1. Install dependencies (see the alias notes above):
   ```bash
   npm install
   npm run after:module_alias
   ```
2. Create a `.env` file in the project root (see [Environment variables](#environment-variables)).
3. Make sure MongoDB is reachable via `MONGO_CONNECTION_STRING`.
4. (Optional) seed the database:
   ```bash
   npm run start:seed        # roles, disciplines, root admin user
   npm run start:seed_full   # + theory, practice and content (uploads images to S3)
   ```
   ⚠️ The seed script **drops all collections** in the target database before filling it.
5. Run the server:
   ```bash
   npm run start:dev         # nodemon + tsconfig-paths, watches ./app
   ```
6. Open Swagger UI at `http://localhost:<PORT>/api-docs`.

### Scripts

| Script                             | Description                                              |
| ---------------------------------- | -------------------------------------------------------- |
| `npm run start:dev`                | Dev server with auto-reload                              |
| `npm start`                        | Runs with `NODE_ENV=production` (via nodemon + ts-node)  |
| `npm run start:seed`               | Seed base data                                           |
| `npm run start:seed_full`          | Seed base data + theory / practice / content             |
| `npm run lint`                     | ESLint                                                   |
| `npm run prettier`                 | Format everything in `app/`                              |
| `npm run before:module_alias`      | Clean `@` alias link (see above)                         |
| `npm run after:module_alias`       | Create `@` alias link (see above)                        |

### Docker

```bash
docker build -t netb-be .
docker run --env-file .env -p 4001:4001 netb-be
```

The image only contains the API (`node:18-alpine`, runs `npm run start:dev`, exposes `4001`).
MongoDB is **not** part of the image — point `MONGO_CONNECTION_STRING` to an external instance.

## Environment variables

| Variable                  | Required | Description                                                         |
| ------------------------- | -------- | ------------------------------------------------------------------- |
| `NODE_ENV`                | yes      | `development` \| `production` \| `test`                             |
| `PORT`                    | yes      | HTTP port                                                           |
| `URL`                     | no       | Base URL used in Swagger servers, default `http://localhost`        |
| `FRONTEND_URL`            | no       | Allowed CORS origin, default `http://localhost:3000`                |
| `MONGO_CONNECTION_STRING` | yes      | MongoDB connection string                                           |
| `MONGO_DB_NAME`           | yes      | Database name                                                       |
| `JWT_SECRET_KEY`          | yes      | JWT secret                                                          |
| `ACCESS_TOKEN_SECRET`     | yes      | Access token signing secret                                         |
| `REFRESH_TOKEN_SECRET`    | yes      | Refresh token signing secret                                        |
| `ACCESS_TOKEN_LIFETIME`   | yes      | Access token TTL (e.g. `15m`)                                       |
| `REFRESH_TOKEN_LIFETIME`  | yes      | Refresh token TTL (e.g. `7d`)                                       |
| `AWS_REGION`              | no       | S3 region, default `eu-west-1`                                      |
| `SEED_SUPERUSER`          | seed     | Root admin name                                                     |
| `SEED_USER_EMAIL`         | seed     | Root admin email                                                    |
| `SEED_PASSWORD`           | seed     | Root admin password (min 6 chars)                                   |

AWS credentials are taken from the standard AWS SDK credential chain (env vars, shared config, etc.).
Buckets are named `quiz-<discipline>`.

## Project structure

```
.
├── app/                         # application source (alias "@" → ./app)
│   ├── index.ts                 # entry point: middlewares, swagger, routing, DB connect
│   ├── config/                  # env loading and Joi validation of env variables
│   ├── routing/
│   │   ├── routes/
│   │   │   ├── index.ts         # routingSchema: ordered list of prefix + middlewares + router
│   │   │   ├── public/          # routes without auth (auth, disciplines, theory, practice)
│   │   │   └── private/         # routes behind JWT + role check (user, role, quiz, theory, practice, discipline)
│   │   └── validators/          # Joi schemas for request bodies / params
│   ├── controllers/             # HTTP layer: parse request, call service, send response
│   ├── services/                # business logic (Auth, User, Role, Discipline, Theory, Practice,
│   │                            #   Quiz, Content, Media, StorageSdk for S3)
│   ├── db/
│   │   ├── client.ts            # Mongoose connection
│   │   ├── models/              # Mongoose schemas (+ Swagger component schemas in JSDoc)
│   │   └── *.db.ts              # data-access functions per entity (queries, aggregations)
│   ├── middlewares/             # auth / role checks, discipline check, error handler,
│   │                            #   event logger, media upload, body parsing, toJSON
│   ├── swagger/                 # OpenAPI definition for swagger-jsdoc
│   └── common/
│       ├── constants/           # routes, roles, errors, AWS helpers, aggregation builders
│       ├── enums/               # RolesEnum, DisciplineEnum, TheoryItemEnum, WinstonLevelEnum
│       ├── helpers/             # loggers, error handlers, file/JSON helpers, mappers
│       ├── interfaces/          # TypeScript interfaces (entities, services, responses)
│       ├── types/               # shared types
│       └── validators/          # shared Joi validators (e.g. discipline param)
├── __seedData/                  # seed script (index.ts) and JSON data + image assets
├── Dockerfile
├── commitlint.config.js         # conventional commits
├── tsconfig.json / tsconfig.build.json
└── package.json
```

### Request flow

```
request → CORS / json / cookies / file upload → event logger → toJSON middleware
        → routingSchema (public routes → authMiddleware → role-protected routes)
        → Joi validator → controller → service → db layer (Mongoose)
        → response  (errors → errorHandlerMiddleware, unknown paths → notFoundHandler)
```

`/:discipline/...` routes are guarded by `disciplineMiddleware`, which checks that the discipline exists in the DB.

## Data model

| Collection   | Key fields                                                                                           |
| ------------ | ---------------------------------------------------------------------------------------------------- |
| `User`       | `user_name`, `user_email` (unique), `user_password` (bcrypt hash), `user_role`                       |
| `Role`       | `name` (`user` / `student` / `teacher` / `admin`), `access_level` (0 / 1 / 2 / 9)                    |
| `Discipline` | `name`, `link_name` (used in URLs, e.g. `js`)                                                        |
| `Theory`     | `discipline`, `title`, `content[]` → `Content`, `links[]`, `created_by`, timestamps                  |
| `Content`    | `content_type` (`text` / `code` / `table` / `list`), `content_data`, `order`, `content_image`        |
| `Practice`   | `discipline`, `code`, `answers[]`, `right_answer[]`, `details`, `created_by`                         |
| `Quiz`       | `discipline`, `tasks[]` → `Practice`, `questions[]` → `Theory`, `answered_questions {right, wrong}`, `done` |

## API overview

Full, interactive documentation: **`/api-docs`** (JSON spec: `/swagger/swagger.json`).

List endpoints are paginated with `page` and `limit` query params and return
`{ items, total, has_next, limit, page }`.

### Public

| Method | Path                                      | Description                       |
| ------ | ----------------------------------------- | --------------------------------- |
| POST   | `/auth/sign-up`                           | Register a user                   |
| POST   | `/auth/login`                             | Returns access token, sets `refreshToken` cookie |
| POST   | `/auth/refresh-token`                     | New access token from the cookie  |
| GET    | `/disciplines/get-all`                    | List disciplines                  |
| GET    | `/:discipline/theory`, `/:discipline/theory/:theory_id`     | Theory list / item   |
| GET    | `/:discipline/practice`, `/:discipline/practice/:practice_id` | Practice list / item |

### Protected (`Authorization: Bearer <accessToken>`)

| Method          | Path                                              | Role            |
| --------------- | ------------------------------------------------- | --------------- |
| GET/POST        | `/:discipline/quiz`                               | user            |
| GET/PATCH/DELETE| `/:discipline/quiz/:quiz_id`                      | user            |
| POST/PUT/DELETE | `/:discipline/theory[/:theory_id]` (multipart, images → S3) | teacher |
| POST/PUT/DELETE | `/:discipline/practice[/:practice_id]`            | teacher         |
| POST/PUT/DELETE | `/disciplines[/:discipline_id]`                   | teacher         |
| GET             | `/user/get-all`                                   | admin           |
| GET             | `/user/:user_id`                                  | user            |
| PUT             | `/user/update-user/:user_id`                      | user            |
| DELETE          | `/user/delete-user/:user_id`                      | user            |
| PATCH           | `/user/update-role/:user_id`                      | admin           |
| GET/POST/DELETE | `/role/get-all`, `/role`, `/role/:role_id`        | admin           |

`admin` passes every role check.

## Seed data

`__seedData/` contains the script and its inputs:

- `roles.json`, `disciplines.json` — base data;
- `practices.json`, `theories.json`, `contents.json` — learning content (loaded with `start:seed_full`);
- `assets/` — images referenced from content items, uploaded to the discipline's S3 bucket;
- `theory_full.json`, `users.json` — auxiliary data not used by the seed script.

## Branching and commits

Work happens in short-lived `feature/*`, `fix/*`, `refactor/*` branches merged through pull requests
into `development`; `main` holds the stable state. Commit messages follow
[Conventional Commits](https://www.conventionalcommits.org/) (enforced by commitlint).
