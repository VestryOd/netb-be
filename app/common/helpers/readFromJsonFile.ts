import { promises } from "fs";

export const readFromJsonFile = async (path: string) => {
  return await promises
    .readFile(path, { encoding: "utf-8" })
    .then((data) => {
      if (data) {
        console.log("--data", JSON.parse(data));
        return { error: null, data: JSON.parse(data) };
      } else return null;
    })
    .catch((error) => {
      console.log("--read file err");
      return { error, data: null };
    });
};
