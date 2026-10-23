import { readFromJsonFile } from "../helpers";

export const MODE = {
  PROD: "production",
  DEV: "development",
  TEST: "test",
};

export const devDefaultUrl = "http://localhost";

export const urlValidateRegexp =
  /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;

export const urlValidateMessage = "Url is invalid";

const ERROR = "\x1b[31m";
const SUCCESS = "\x1b[32m";
const INFO = "\x1b[33m";

export const log = {
  ok: (text: string) => console.log(SUCCESS, text),
  error: (text: string) => console.log(ERROR, text),
  info: (text: string) => console.log(INFO, text),
};

export const readDataFromFile = async (fileName: string) => {
  const { data, error } = await readFromJsonFile(fileName);

  if (error) {
    log.error(`Error of reading file ${fileName}`);
    process.exit(1);
  }

  return data;
};
