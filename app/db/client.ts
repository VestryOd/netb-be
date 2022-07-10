import * as mongoose from "mongoose";
import { mongoConnect } from "@/config";
import { loggerHelper } from "../common/helpers";

export const closeConnection = () => mongoose.disconnect();

export const connectToDB = (cb: () => any) => {
  try {
    mongoose
      .connect(mongoConnect)
      .then(() => console.log("connected!"))
      .catch((err) => console.log("connection problem", err));

    mongoose.set("toJSON", {
      virtuals: true,
      transform: (doc, converted) => {
        delete converted._id;
      },
    });

    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", () => cb());
  } catch (err) {
    loggerHelper.log({
      level: "error",
      message: `DB connection error. Reason: ${err.message}`,
    });
  }
};
