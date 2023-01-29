import { Schema, connection } from "mongoose";
import { SchemaNames } from "@/common/constants";
import { disciplineDbsConfig } from "@/config";

// js, sql
export const generateModels = (schemaName: SchemaNames, schema: Schema) => {
  const models: Record<string, any> = {};
  disciplineDbsConfig.forEach((dbName) => {
    const db = connection.useDb(dbName);
    models[dbName] = db.model(schemaName, schema);
  });
  return models;
};
