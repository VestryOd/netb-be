import { Schema, model } from "mongoose";
import { SchemaNames } from "@/common/constants";

/**
 * @swagger
 * components:
 *   schemas:
 *     Quiz:
 *       type: object
 *       properties:
 *         tasks:
 *           type: array
 *           minLength: 1
 *           items:
 *             $ref: '#/components/schemas/Practice'
 *         created_at:
 *           type: string
 *           format: date-time
 *         created_by:
 *           $ref: '#/components/schemas/User'
 *       required:
 *       - tasks
 *       - created_by
 */
const quizSchema = new Schema(
  {
    tasks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Practice",
        required: true,
        validate: [(arr: any[]) => arr.length >= 1, "{PATH} needs min 1 item"],
      },
    ],
    created_at: { type: Date, default: Date.now },
    created_by: {
      type: Schema.Types.ObjectId,
      ref: SchemaNames.User,
      required: true,
    },
  },
  { versionKey: false }
);

export const QuizModel = model(SchemaNames.Quiz, quizSchema);
