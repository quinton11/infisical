import { TDbClient } from "@app/db";
import { TableName } from "@app/db/schemas";
import { ormify } from "@app/lib/knex";

export type TDynamicSecretDALFactory = ReturnType<typeof dynamicSecretDALFactory>;

export const dynamicSecretDALFactory = (db: TDbClient) => {
  const orm = ormify(db, TableName.DynamicSecret);
  return orm;
};
