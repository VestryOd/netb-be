import { connection, disconnect, connect, set } from "mongoose";
import { loggerHelper } from "@/common/helpers";
import { mode, mongoConnect, mongoDbName } from "@/config";

export const closeConnection = () => disconnect();

export const connectToDB = (cb: () => any) => {
  try {
    connect(mongoConnect, {
      dbName: mongoDbName,
      autoIndex: mode === "development",
    })
      .then(() => console.log("connected!"))
      .catch((err) => console.log("connection problem", err));

    set("toJSON", {
      virtuals: true,
      transform: (doc, converted) => {
        delete converted._id;
      },
    });

    connection.on("error", console.error.bind(console, "connection error:"));
    connection.once("open", () => cb());
  } catch (err) {
    loggerHelper.log({
      level: "error",
      message: `DB connection error. Reason: ${err.message}`,
    });
  }
};
