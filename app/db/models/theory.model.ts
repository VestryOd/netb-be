import { model, Schema, Types } from "mongoose";
import { SchemaNames } from "@/common/constants";

/**
 * @swagger
 * components:
 *   schemas:
 *     Theory:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         discipline:
 *           type: string
 *         title:
 *           type: string
 *           default: ""
 *         content:
 *           type: array
 *           minItems: 1
 *           items:
 *             $ref: '#/components/schemas/Content'
 *         links:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               resource_name:
 *                 type: string
 *               url:
 *                 type: string
 *               title:
 *                 type: string
 *             required:
 *               - url
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
 *         - title
 *         - content
 *         - created_by
 */
const theorySchema = new Schema(
  {
    _id: Types.ObjectId,
    discipline: { type: String, required: true },
    title: { type: String, default: "" },
    content: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Content",
      },
    ],
    links: {
      type: [
        {
          resource_name: String,
          url: { type: String, required: true },
          title: { type: String },
        },
      ],
      default: undefined,
    },
    created_at: { type: Date, default: Date.now },
    created_by: {
      type: Schema.Types.ObjectId,
      ref: SchemaNames.User,
      required: true,
    },
    updated_at: { type: Date },
  },
  { versionKey: false }
);

export const TheoryModel = model(SchemaNames.Theory, theorySchema);
