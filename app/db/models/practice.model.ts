import { Schema } from "mongoose";
import { generateModels } from "@/common/helpers";
import { SchemaNames } from "@/common/constants";

export const PracticeModel = new Schema({
  p__code: { type: String, required: true },
  p__answers: { type: [String], required: true },
  p__right_answer: { type: Number, required: true },
  p__details: { type: String, default: "" },
});

export const PracticeModels = generateModels(
  SchemaNames.Practice,
  PracticeModel
);
