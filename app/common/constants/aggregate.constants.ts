/* eslint-disable @typescript-eslint/indent,indent */
import { Types } from "mongoose";
import { SchemaNames } from "./routes.constants";

export type TheoryAggregateQueryType = {
  discipline: string;
  schemaName: SchemaNames;
  id?: string;
  skip?: string | number;
  limit?: string | number;
};

type defaultAggregateStagesType = Record<string, object | string | number>;

const userAggregate = [
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

const aggregateQueriesMap = new Map([
  [SchemaNames.Practice, userAggregate],
  [
    SchemaNames.Theory,
    [
      {
        $lookup: {
          from: "contents",
          localField: "content",
          foreignField: "_id",
          as: "content",
        },
      },
      ...userAggregate,
    ],
  ],
]);

export const aggregateQuery = ({
  discipline,
  schemaName,
  id,
  skip,
  limit,
}: TheoryAggregateQueryType): defaultAggregateStagesType[] => {
  const $match = id
    ? { discipline, _id: new Types.ObjectId(id) }
    : { discipline };
  const $skip = skip && limit ? +skip * +limit : undefined;
  const $limit = limit ? +limit : undefined;
  return $skip && $limit
    ? [
        { $match },
        ...aggregateQueriesMap.get(schemaName),
        { $skip },
        { $limit },
      ]
    : [{ $match }, ...aggregateQueriesMap.get(schemaName)];
};
