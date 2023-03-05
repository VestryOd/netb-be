import { model, Schema } from "mongoose";
import { TheoryComplexityEnum } from "@/common/enums";
import { SchemaNames } from "@/common/constants";

const theorySchema = new Schema(
  {
    discipline: {
      type: Schema.Types.ObjectId,
      ref: SchemaNames.Discipline,
      required: true,
    },
    title: { type: String, default: "" },
    complexity: {
      type: String,
      enum: [...Object.values(TheoryComplexityEnum)],
      default: TheoryComplexityEnum.Lower,
    },
    content: [
      {
        _id: {
          type: Schema.Types.ObjectId,
          required: true,
          refPath: "onModel",
        },
        // validate: [(arr: any[]) => arr.length >= 1, "{PATH} needs min 1 item"],
      },
    ],
    onModel: {
      type: String,
      // required: true,
      enum: ["Content", "Image"],
    },
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
  },
  { versionKey: false }
);

export const TheoryModel = model(SchemaNames.Theory, theorySchema);
