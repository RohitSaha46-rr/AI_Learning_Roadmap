import express from "express";

import { createAIRoadmap, createManualRoadmap, getRoadmaps } from "../controllers/RoadMapController.js";
import auth from "../middleware/auth.js";

const router = express.Router();


router.post("/manual",auth,createManualRoadmap);
router.post("/ai",auth, createAIRoadmap);
router.get("/", auth, getRoadmaps);

export default router;
