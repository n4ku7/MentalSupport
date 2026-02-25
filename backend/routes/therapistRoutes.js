import express from "express";
import {
  createTherapist,
  getTherapists,
  getMyTherapistProfile,
  addMyAvailability,
} from "../controllers/therapistController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getTherapists);
router.post("/", protect, adminOnly, createTherapist);
router.get("/me", protect, getMyTherapistProfile);
router.post("/me/availability", protect, addMyAvailability);

export default router;
