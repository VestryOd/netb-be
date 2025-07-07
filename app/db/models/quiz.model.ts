import { Schema, model } from "mongoose";
import { SchemaNames } from "@/common/constants";

/**
 * @swagger
 * components:
 *   schemas:
 *     Quiz:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         discipline:
 *           type: string
 *         tasks:
 *           type: array
 *           minLength: 1
 *           items:
 *             $ref: '#/components/schemas/Practice'
 *         questions:
 *           type: array
 *           default: []
 *           items:
 *             $ref: '#/components/schemas/Theory'
 *         answered_questions:
 *           type: object
 *           properties:
 *             right:
 *               type: array
 *               default: []
 *               items:
 *                 type: string
 *             wrong:
 *               type: array
 *               default: []
 *               items:
 *                 type: string
 *         done:
 *           type: boolean
 *           default: false
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *         created_by:
 *           $ref: '#/components/schemas/User'
 *       required:
 *       - tasks
 *       - done
 *       - created_by
 *       - discipline
 */
const quizSchema = new Schema(
  {
    discipline: {
      type: String,
      required: true,
    },
    tasks: [
      {
        type: Schema.Types.ObjectId,
        ref: SchemaNames.Practice,
        required: true,
      },
    ],
    questions: [
      {
        type: Schema.Types.ObjectId,
        ref: SchemaNames.Theory,
        default: [],
      },
    ],
    answered_questions: {
      type: {
        right: {
          type: [{ type: Schema.Types.ObjectId }],
        },
        wrong: {
          type: [{ type: Schema.Types.ObjectId }],
        },
      },
      default: {
        right: [],
        wrong: [],
      },
    },
    done: {
      type: Boolean,
      required: true,
      default: false,
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    created_by: {
      type: Schema.Types.ObjectId,
      ref: SchemaNames.User,
      required: true,
    },
  },
  { versionKey: false }
);

export const QuizModel = model(SchemaNames.Quiz, quizSchema);
