import { Schema, connection } from "mongoose";
import { SchemaNames } from "@/common/constants";
import { dbsConfig } from "@/config";

export const generateModels = (schemaName: SchemaNames, schema: Schema) => {
  const models: Record<string, any> = {};
  dbsConfig.forEach((dbName) => {
    const db = connection.useDb(dbName);
    models[dbName] = db.model(schemaName, schema);
  });
  return models;
};
