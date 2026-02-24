import express from "express";
import {
  bookAppointment,
  getMyAppointments,
  getAllAppointments,
} from "../controllers/appointmentController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";
import { updateAppointmentStatus } from "../controllers/appointmentController.js";
const router = express.Router();

router.post("/", protect, bookAppointment);
router.get("/my", protect, getMyAppointments);
router.get("/", protect, adminOnly, getAllAppointments);
router.put("/:id", protect, adminOnly, updateAppointmentStatus);
export default router;
