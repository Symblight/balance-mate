# Server

## Installation

```shell
pnpm install
```

## Configuration

```shell
cp config/example.json config/development.json
cp config/example.json config/production.json
```

## Scripts

development

```shell
pnpm dev
```

production

```shell
pnpm build
pnpm start
```

## Database

Postgres

Init Database

```shell
psql postgres -f ./tools/postgres-dev-init.sql
```

Knex commands

```
migrate:make [name]
migrate:latest
migrate:rollback
migrate:up
migrate:down
migrate:list
```

---
