import { model, Schema } from "mongoose";
import { SchemaNames } from "@/common/constants";
import { PracticeTypeEnum } from "@/common/enums/PracticeTypeEnum";

const practiceSchema = new Schema({
  type: {
    type: String,
    enum: [...Object.values(PracticeTypeEnum)],
    required: true,
  },
  discipline: {
    type: Schema.Types.ObjectId,
    ref: SchemaNames.Discipline,
    required: true,
  },
  code: { type: String },
  answers: { type: [String], required: true },
  right_answer: { type: [Number], required: true },
  details: { type: String, default: undefined },
  created_at: { type: Date, default: Date.now },
  created_by: {
    type: Schema.Types.ObjectId,
    ref: SchemaNames.User,
    required: true,
  },
});

export const PracticeModel = model(SchemaNames.Practice, practiceSchema);
