import dotenv from "dotenv";
import express from "express";
import RoadMapRoutes from "./routes/RoadMapRoutes.js"
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import { mongodb } from "./config/db.js";

dotenv.config();
const app=express();
mongodb();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/roadmaps", RoadMapRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Connection established at port ${PORT}`);
});