import { model, Schema } from "mongoose";
import { SchemaNames } from "@/common/constants";

/**
 * @swagger
 * components:
 *   schemas:
 *     Practice:
 *       type: object
 *       properties:
 *         discipline:
 *           type: string
 *         code:
 *           type: string
 *         answers:
 *           type: array
 *           items:
 *             type: string
 *         right_answer:
 *           type: array
 *           items:
 *             type: number
 *         details:
 *           type: string
 *           default: undefined
 *         created_at:
 *           type: string
 *           format: date-time
 *         created_by:
 *           $ref: '#/components/schemas/User'
 *         updated_at:
 *           type: string
 *           format: date-time
 *       required:
 *         - discipline
 *         - answers
 *         - right_answer
 *         - created_by
 */
const practiceSchema = new Schema(
  {
    discipline: { type: String, required: true },
    code: { type: String },
    answers: { type: [String], required: true },
    right_answer: { type: [Number], required: true },
    details: { type: String, default: undefined },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date } || undefined,
    created_by: {
      type: Schema.Types.ObjectId,
      ref: SchemaNames.User,
      required: true,
    },
  },
  { versionKey: false }
);

export const PracticeModel = model(SchemaNames.Practice, practiceSchema);
