import * as fs from "fs";

export const saveRequestBodyToFile = <T>(body: T, name = "output.txt") => {
  const writer = fs.createWriteStream(name);
  writer.write(JSON.stringify(body, null, 2));
};
