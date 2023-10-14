import { client } from "./utils/db.js";
import express from "express";

async function init() {
  try {
    await client.connect();
    console.log("Connected to the database");

    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    const PORT = process.env.PORT || 4000;

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}

init();
