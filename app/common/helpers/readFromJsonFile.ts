import { promises } from "fs";

export const readFromJsonFile = async (path: string) => {
  return await promises
    .readFile(path, { encoding: "utf-8" })
    .then((data) => {
      if (data) {
        return { error: null, data: JSON.parse(data) };
      } else return null;
    })
    .catch((error) => {
      return { error, data: null };
    });
};
