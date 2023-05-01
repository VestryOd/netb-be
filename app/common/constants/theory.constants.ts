import { Types } from "mongoose";

export type TheoryAggregateQueryType = {
  discipline: string;
  theory_id?: string;
  skip?: string | number;
  limit?: string | number;
};

type defaultAggregateStagesType = Record<string, object | string | number>;

export const defaultAggregateStages: defaultAggregateStagesType[] = [
  {
    $lookup: {
      from: "contents",
      localField: "content",
      foreignField: "_id",
      as: "content",
    },
  },
  {
    $lookup: {
      from: "users",
      localField: "created_by",
      foreignField: "_id",
      pipeline: [{ $project: { _id: 0, user_email: 1, user_name: 1 } }],
      as: "created_by",
    },
  },
  {
    $unwind: "$created_by",
  },
];
export const theoryAggregateQuery = ({
  discipline,
  theory_id,
  skip,
  limit,
}: TheoryAggregateQueryType): Record<string, object | string | number>[] => {
  const $match = theory_id
    ? { discipline, _id: new Types.ObjectId(theory_id) }
    : { discipline };
  const $skip = skip && limit ? +skip * +limit : undefined;
  const $limit = limit ? +limit : undefined;
  return $skip && $limit
    ? [{ $match }, ...defaultAggregateStages, { $skip }, { $limit }]
    : [{ $match }, ...defaultAggregateStages];
};
