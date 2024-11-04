import { Types } from "mongoose";
import { IS_NOT_CORRECT_ID } from "../constants";
import { IErrorInterface } from "@/common/interfaces";
const ObjectId = Types.ObjectId;

export const isValidObjectId = (id: string): IErrorInterface | string => {
  const isValid = ObjectId.isValid(id) && String(new ObjectId(id)) === id;

  if (isValid) {
    return id;
  } else {
    throw IS_NOT_CORRECT_ID(id);
  }
};
