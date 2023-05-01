import { model, Schema, Types } from "mongoose";
import { SchemaNames } from "@/common/constants";

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
          title: { type: String, required: true },
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
