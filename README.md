# Base of a [Node.Js](https://nodejs.org/en/about) API application made with [Typescript](https://www.typescriptlang.org/)

It is configured with:

- [Express](https://expressjs.com) for request provider
- [JWT](https://jwt.io) for authentication
- [TypeORM](https://typeorm.io) for [ORM](https://en.wikipedia.org/wiki/Object%E2%80%93relational_mapping) provider
- [Jest](https://jestjs.io) to test and coverage
- Factories for testing
- [ESLint](https://eslint.org) for [code linting](https://www.perforce.com/blog/qac/what-lint-code-and-why-linting-important)
- [Nodemon](https://nodemon.io) for hot reload backend server
- [TS Node](https://github.com/TypeStrong/ts-node) as development Typescript's runner
- [Dotenv](https://github.com/motdotla/dotenv) to manage environment variables
- [VS Code debug](https://code.visualstudio.com/docs/editor/debugging) for backend (without build need)
- [Docker Compose](https://docs.docker.com/compose) for provide database, Node.Js and Yarn inside container

## :memo: Prerequisites

- [Docker Compose](https://docs.docker.com/compose) it will provide all required dependencies (via a Node.Js container)

or without Docker:

- [NodeJs](https://nodejs.org)
- [Yarn](https://yarnpkg.com)
- [PostgreSQL](https://www.postgresql.org). You can use other database, making some adjustments.

## :checkered_flag: Getting Started (with Docker)

Run in bash:

```bash
# Install dependencies
yarn install --frozen-lockfile

# Build containers and run it
docker-compose up -d

# Open container's bash
docker-compose exec app sh

# Command below is run inside container
# Create database for development
PGPASSWORD=postgres psql -U postgres -h postgres -p 5432 postgres -c 'CREATE DATABASE app_development;'

# Create database for testing
PGPASSWORD=postgres psql -U postgres -h postgres -p 5432 postgres -c 'CREATE DATABASE app_testing;'

# Create databases for development
yarn typeorm migration:run

# Create databases for testing
yarn typeorm:test migration:run

# Keeps app running, watching for changes
yarn start
```

After that server will be running on `localhost:3000`

## :checkered_flag: Getting Started (without Docker)

In this case, you must provide a database.
Run in bash:

```bash
# Install dependencies
yarn install --frozen-lockfile

# Create databases for development
yarn typeorm migration:run

# Create databases for testing
yarn typeorm:test migration:run

# Keeps running and watching for changes
yarn start
```

After that server will be running on `localhost:5000`

### :balloon: Running coding style linting

Run in bash:

```bash
# Find coding style errors and report
yarn lint

# or

# Find coding style errors and try to fix
yarn lint:fix
```

## :loop: API Routes

| Route         | Verb   | Description                         | Required body                                                                     | Return                  |
|---------------|--------|-------------------------------------|-----------------------------------------------------------------------------------|-------------------------|
| /             | GET    | Landing page with route description |                                                                                   |                         |
| /api/sessions | PUT    | Create new user                     | `{ "name": "User Name", "email": "user@email.com", "password": "user-password" }` | Serialized created user |
| /api/sessions | POST   | Login user                          | `{ "email": "user@email.com", "password": "user-password" }`                      |                         |
| /api/sessions | DELETE | Logout user                         |                                                                                   |                         |

## :wrench: Building a production package

The production build is a package optimized for production.
To build production package, run in bash:

```bash
yarn  build
```

An folder called `build` will be created with package inside. To run in production, run in bash inside this folder:

```bash
node server
```

Note that it is necessary to set the database environment variables. See .env file and TypeORM documentation.

### :notebook: Shortcuts

These shortcuts are made in Linux and may not work in other platforms

| Route         | Verb   | Description                         | Required body                                                                     | Return       |
|---------------|--------|-------------------------------------|-----------------------------------------------------------------------------------|--------------|
| /             | GET    | Landing page with route description |                                                                                   |              |
| /api/sessions | PUT    | Create new user                     | `{ "name": "User Name", "email": "user@email.com", "password": "user-password" }` | User created |
| /api/sessions | POST   | Login user                          | `{ "email": "user@email.com", "password": "user-password" }`                      |              |
| /api/sessions | DELETE | Logout user                         |                                                                                   |              |

### :information_source: Observations

- To use other database, see [TypeORM docs](https://typeorm.io) for informations.
- You can use Docker Compose to provide database (using `docker-compose up -d`) and run server (or any commands) outside docker (only if you have Node.Js and Yarn). If it is running internally, server is provided in port 3000; otherwise, 5000.
- Configured to use [Typescript paths](https://www.typescriptlang.org/docs/handbook/module-resolution.html).
- Uses [TS Node](https://github.com/TypeStrong/ts-node) to avoid the need for build project to run TypeORM commands.
- To debug on VS Code, is needed to run Docker Compose (using `docker-compose up -d`) to provide database.
- To access Postgres outside Docker, connect to 0.0.0.0:5454.
- Unit tests are placed aside its corresponding files with suffix .test.
- Tests must be performed individually, due to database constraints.
- Project is configured to use [Dotenv](https://github.com/motdotla/dotenv) as environment variable (env) manage. In production this is not used and envs must be defined outside application.
  - Files called `.env` is used in development and have all envs needed in production.
  - Files called `.env.testing` is used for testing and complements `.env` file.
  - According to [Dotenv docs](https://github.com/motdotla/dotenv#what-happens-to-environment-variables-that-were-already-set), variables are never replaced if an existing one is found in memory. Therefore, envs defined in SO take precedence over the `.env` and `.env.testing` files.
  - In testing `.env.testing` take precedence over the `.env` file.
