import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import testRoutes from "./routes/testRoutes.js";
import resourceRoutes from "./routes/resourceRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import therapistRoutes from "./routes/therapistRoutes.js";
dotenv.config();
connectDB();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/resources", resourceRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/therapists", therapistRoutes);
app.get("/", (req, res) => {
  res.send("API Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
