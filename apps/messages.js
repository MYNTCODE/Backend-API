import { ObjectId } from "mongodb";
import { Router } from "express";

// 1) Import ตัว Database ที่สร้างไว้มาใช้งาน
import { db } from "../utils/db.js";

const messageRouter = Router();

messageRouter.get("/", async (req, res) => {
  // 2) เลือก Collection
  const collection = db.collection("messages");

  // 3) เริ่ม Query โดยใช้ `collection.find(query)`
  const movies = await collection
    //.limit(1)
    .toArray(); // convert documents into an array

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
  // 2) เลือก Collection
  const collection = db.collection("messages");

  // 3) Update ข้อมูลใน Database โดยใช้ `collection.updateOne(query)` โดยการ
  // นำ messageId จาก Endpoint parameter มา Assign ลงใน Variable `messageId` โดยที่ใช้ ObjectId ในการ Convert Type ก่อน
  const messageId = ObjectId(req.params.messageId);
  // นำข้อมูลที่ส่งมาใน Request Body ทั้งหมด Assign ใส่ลงไปใน Variable ที่ชื่อว่า `newMessageData`
  const newMessageData = { ...req.body };

  await collection.updateOne(
    {
      _id: messageId,
    },
    {
      $set: newMessageData,
    }
  );

  // 4) ส่ง Response กลับไปหา Client
  return res.json({
    message: ` (${messageId}) has been updated successfully`,
  });
});

messageRouter.delete("/:messageId", async (req, res) => {
  // 2) เลือก Collection
  const collection = db.collection("messages");

  // 3) Delete ข้อมูลออกจากใน Database โดยใช้ `collection.deleteOne(query)`
  // นำ messageId จาก Endpoint parameter มา Assign ลงใน Variable `messageId`
  const messageId = ObjectId(req.params.messageId);

  await collection.deleteOne({
    _id: messageId,
  });

  // 4) ส่ง Response กลับไปหา Client
  return res.json({
    message: `(${messageId}) has been deleted successfully`,
  });
});

export default messageRouter;
