import { Types } from "mongoose";
import { NOT_FOUND } from "../constants";
const ObjectId = Types.ObjectId;

export const isValidObjectId = (id: string): string => {
  const isValid = ObjectId.isValid(id) && String(new ObjectId(id)) === id;

  if (isValid) {
    return id;
  } else {
    throw NOT_FOUND(id);
  }
};
