import express from "express";
import {
  api,
  bookRoom,
  bookedroom,
  createRoom,
  getAllCustomerData,
  getallroom,
} from "../Controllers/booking.controller.js";

const router = express.Router();

router.get("/bookingapi", api);

router.post("/createroom", createRoom);
router.get("/getroomdetails", getallroom);
router.post("/bookroom", bookRoom);
router.get("/bookedrooms", bookedroom);
router.get("/customerlist", getAllCustomerData);

export default router;
