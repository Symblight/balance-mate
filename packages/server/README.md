## Database

### Postgres

#### Init Database

```shell
psql postgres -f ./tools/postgres-dev-init.sql
```

#### Knex

```
migrate:make [name]
migrate:latest
migrate:rollback
migrate:up
migrate:down
migrate:list
```

---
