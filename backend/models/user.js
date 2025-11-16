import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  totalPoints: { type: Number, default: 0 },
  level: { type: String, default: "Beginner" },
}, { timestamps: true });

export default mongoose.model("User", userSchema);

