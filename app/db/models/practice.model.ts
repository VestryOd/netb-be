import { model, Schema } from "mongoose";
import { SchemaNames } from "@/common/constants";

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
