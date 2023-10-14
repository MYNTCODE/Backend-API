import { ObjectId } from "mongodb";
import { Router } from "express";

// 1) Import ตัว Database ที่สร้างไว้มาใช้งาน
import { db } from "../utils/db.js";

const messageRouter = Router();

messageRouter.get("/", async (req, res) => {
  // 2) เลือก Collection
  const collection = db.collection("messages");

  // 3) เริ่ม Query โดยใช้ `collection.find(query)`
  const messages = await collection.find({}).toArray(); // convert documents into an array

  // 4) Return ตัว Response กลับไปหา Client
  return res.json({ data: messages });
});

messageRouter.post("/", async (req, res) => {
  // 2) เลือก Collection
  const collection = db.collection("messages");

  // 3) เริ่ม Insert ข้อมูลลงใน Database โดยใช้ `collection.insertOne(query)`
  // นำข้อมูลที่ส่งมาใน Request Body ทั้งหมด Assign ใส่ลงไปใน Variable
  const messageData = { ...req.body };
  const messages = await collection.insertOne(messageData);
  // 4) Return ตัว Response กลับไปหา Client
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

    // You can customize the error response based on the type of error
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
