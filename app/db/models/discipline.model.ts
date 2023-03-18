import { Schema, model } from "mongoose";
import { SchemaNames } from "@/common/constants";

const disciplineSchema = new Schema(
  {
    name: { type: String, require: true, unique: true, index: true },
    link_name: { type: String, require: true },
  },
  { versionKey: false }
);

export const DisciplineModel = model(SchemaNames.Discipline, disciplineSchema);
