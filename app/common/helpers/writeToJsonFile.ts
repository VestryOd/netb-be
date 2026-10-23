import { writeFile } from "fs";

export const writeToJsonFile = (path: string, data: string) => {
  writeFile(path, data, "utf8", (error) => {
    if (error) {
      console.log("Error on writing file", error);
      return false;
    }
  });
};
