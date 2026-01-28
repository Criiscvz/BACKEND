#!/bin/sh
set -e

export PGPASSWORD="$DB_PASS"

echo "⏳ Esperando db_primary..."
until pg_isready -h db_primary -U "$DB_USER" -d "$DB_NAME" >/dev/null 2>&1; do sleep 2; done
echo "⏳ Esperando db_mirror..."
until pg_isready -h db_mirror -U "$DB_USER" -d "$DB_NAME" >/dev/null 2>&1; do sleep 2; done

echo "✅ Iniciando sincronización simulada (cada 60s)..."

while true; do
  echo "🔁 Sync: primary -> mirror"
  pg_dump -h db_primary -U "$DB_USER" -d "$DB_NAME" --clean --if-exists --no-owner --no-privileges \
    | psql -h db_mirror -U "$DB_USER" -d "$DB_NAME"
  sleep 60
done
