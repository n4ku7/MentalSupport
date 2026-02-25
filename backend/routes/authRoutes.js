import express from "express";
import {
	registerUser,
	loginUser,
	createTherapistUser,
	getAllUsers,
} from "../controllers/authController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/therapist-user", protect, adminOnly, createTherapistUser);
router.get("/users", protect, adminOnly, getAllUsers);

export default router;
