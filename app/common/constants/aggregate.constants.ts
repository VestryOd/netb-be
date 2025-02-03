/* eslint-disable @typescript-eslint/indent,indent */
import { Types, PipelineStage } from "mongoose";

import { SchemaNames } from "./routes.constants";

export type TheoryAggregateQueryType = {
  discipline: string;
  schemaName: SchemaNames;
  id?: string;
  skip?: string | number;
  limit?: string | number;
};

export type QuizAggregateQueryType = Pick<
  TheoryAggregateQueryType,
  "limit" | "skip" | "schemaName"
> & {
  discipline: string;
  finished_only?: boolean;
  user_id: string;
  quiz_id?: string;
};

export type CreateQuizAggregateQueryType = {
  discipline: string;
  schemaName: SchemaNames;
  limit: number;
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
  [
    SchemaNames.Quiz,
    [
      {
        $lookup: {
          from: "practices",
          localField: "tasks",
          foreignField: "_id",
          as: "tasks",
        },
      },
      {
        $lookup: {
          from: "theories",
          localField: "questions",
          foreignField: "_id",
          as: "questions",
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

export const aggregateQuizQuery = ({
  discipline,
  schemaName,
  limit = 10,
  skip,
  finished_only,
  user_id,
  quiz_id,
}: QuizAggregateQueryType): PipelineStage[] => {
  const baseMatch = finished_only
    ? {
        discipline,
        created_by: new Types.ObjectId(user_id),
        done: finished_only,
      }
    : { discipline, created_by: new Types.ObjectId(user_id) };

  const $match = quiz_id
    ? { ...baseMatch, _id: new Types.ObjectId(quiz_id) }
    : { ...baseMatch };

  const $limit = limit ? +limit : undefined;
  const $skip = skip && limit ? +skip * +limit : undefined;
  return $limit && $skip
    ? [
        { $match },
        { $skip },
        ...aggregateQueriesMap.get(schemaName),
        { $limit },
      ]
    : [{ $match }, ...aggregateQueriesMap.get(schemaName)];
};

export const aggregateCreateQuizQuery = ({
  discipline,
  schemaName,
  limit = 10,
}: CreateQuizAggregateQueryType) => {
  const $match = { discipline };
  const $limit = limit ? +limit : 0;
  return [{ $match }, ...aggregateQueriesMap.get(schemaName), { $limit }];
};
