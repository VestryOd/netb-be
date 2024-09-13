import { Schema, model } from "mongoose";
import { RolesEnum } from "@/common/enums";
import { SchemaNames } from "@/common/constants";

/**
 * @swagger
 * components:
 *   schemas:
 *     Role:
 *       type: object
 *       properties:
 *         name:
 *           $ref: '#/components/schemas/RoleTypes'
 *           default: user
 *         access_level:
 *           type: number
 *           default: 1
 *       required:
 *         - name
 *         - access_level
 */
const roleSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      index: true,
      enum: [...Object.values(RolesEnum)],
      default: RolesEnum.USER,
    },
    access_level: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  { versionKey: false }
);

export const RoleModel = model<any>(SchemaNames.Role, roleSchema);
