import { Schema, model } from "mongoose";
import { SchemaNames } from "@/common/constants";

/**
 * @swagger
 * components:
 *   schemas:
 *     Discipline:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         link_name:
 *           type: string
 *       required:
 *         - name
 *         - link_name
 */
const disciplineSchema = new Schema(
  {
    name: { type: String, require: true, unique: true, index: true },
    link_name: { type: String, require: true },
  },
  { versionKey: false }
);

export const DisciplineModel = model(SchemaNames.Discipline, disciplineSchema);
