import express from "express";
import {
  createTherapist,
  getTherapists,
} from "../controllers/therapistController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getTherapists);
router.post("/", protect, adminOnly, createTherapist);

export default router;
