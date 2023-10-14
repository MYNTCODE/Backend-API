import express from "express";
import messageRouter from "./apps/messages.js";
import { client } from "./utils/db.js";

async function init() {
  const app = express();
  const port = 3000;

  await client.connect();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/messages", messageRouter);

  app.get("/", (req, res) => {
    res.send("Hello World! Test Port 3000");
  });

  app.get("*", (req, res) => {
    res.status(404).send("Not found");
  });

  app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
  });
}

init();
