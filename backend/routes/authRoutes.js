import express from "express";
import {
	registerUser,
	loginUser,
	createTherapistUser,
} from "../controllers/authController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/therapist-user", protect, adminOnly, createTherapistUser);

export default router;
