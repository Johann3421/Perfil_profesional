#!/bin/bash
# init-db.sh — Ejecutado por postgres:16-alpine en el primer arranque
# (solo si el volumen de datos está vacío / recién creado)
set -e

DB_USER="${POSTGRES_USER:-portfolio_user}"
DB_PASS="${POSTGRES_PASSWORD:-portfolio_pgpass2024}"
DB_NAME="${POSTGRES_DB:-portfolio_db}"

echo ">>> init-db.sh: asegurando role '${DB_USER}' y base de datos '${DB_NAME}'"

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
  -- Crea el role si no existe (no falla si ya existe)
  DO \$\$
  BEGIN
    IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = '${DB_USER}') THEN
      CREATE ROLE "${DB_USER}" WITH LOGIN PASSWORD '${DB_PASS}';
    END IF;
  END
  \$\$;

  -- Garantiza los permisos necesarios sobre la base de datos
  GRANT ALL PRIVILEGES ON DATABASE "${DB_NAME}" TO "${DB_USER}";
EOSQL

echo ">>> init-db.sh: completado."
