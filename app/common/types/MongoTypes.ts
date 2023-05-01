import { Types } from "mongoose";

export type MongoDeleteManyResultType = {
  acknowledged: boolean;
  deletedCount: number;
};

export type MongoIdType = Types.ObjectId | string;
