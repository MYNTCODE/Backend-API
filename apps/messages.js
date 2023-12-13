import { ObjectId } from "mongodb";
import { Router } from "express";
import { db } from "../utils/db.js";

const messageRouter = Router();

messageRouter.get("/", async (req, res) => {
  const collection = db.collection("messages");

  const messages = await collection.find({}).toArray();

  return res.json({ data: messages });
});

messageRouter.post("/", async (req, res) => {
  const collection = db.collection("messages");

  const messageData = { ...req.body };
  const messages = await collection.insertOne(messageData);

  return res.json({
    message: `Message (${messages.insertedId}) has been created successfully`,
  });
});

messageRouter.put("/:messageId", async (req, res) => {
  try {
    const collection = db.collection("messages");

    const messageId = new ObjectId(req.params.messageId);
    const newMessageData = { ...req.body };

    await collection.updateOne(
      {
        _id: messageId,
      },
      { $set: newMessageData }
    );

    return res.json({
      message: `Message (${messageId}) has been updated successfully`,
    });
  } catch (error) {
    console.error("Error updating message:", error);

    return res.status(500).json({ error: error.message });
  }
});

messageRouter.patch("/:messageId", async (req, res) => {
  try {
    const collection = db.collection("messages");

    const messageId = new ObjectId(req.params.messageId);
    const updatedFields = { ...req.body };

    await collection.updateOne(
      {
        _id: messageId,
      },
      { $set: updatedFields }
    );

    return res.json({
      message: `Message (${messageId}) has been patched successfully`,
    });
  } catch (error) {
    console.error("Error patching message:", error);

    return res.status(500).json({ error: error.message });
  }
});

messageRouter.delete("/:messageId", async (req, res) => {
  try {
    const collection = db.collection("messages");
    const messageId = new ObjectId(req.params.messageId);
    await collection.deleteOne({
      _id: messageId,
    });

    return res.json({
      message: `(${messageId}) has been deleted successfully`,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default messageRouter;
