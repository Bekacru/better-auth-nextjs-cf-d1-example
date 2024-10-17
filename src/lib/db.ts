import { getCloudflareContext } from "@opennextjs/cloudflare";

import { D1Dialect } from "kysely-d1";
import { Kysely } from "kysely";

async function initDbConnectionDev() {
  const { env } = await getCloudflareContext();
  return new D1Dialect({
    database: (env as { DB: D1Database }).DB,
  });
}

function initDbConnection() {
  return new D1Dialect({
    database: process.env.DB,
  });
}

export const db = new Kysely({
  dialect:
    process.env.NODE_ENV === "production"
      ? initDbConnection()
      : await initDbConnectionDev(),
});
