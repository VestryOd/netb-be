export const MODE = {
  PROD: "production",
  DEV: "development",
  TEST: "test",
};

export const devDefaultUrl = "http://localhost";

export const urlValidateRegexp =
  /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;

export const urlValidateMessage = "Url is invalid";
