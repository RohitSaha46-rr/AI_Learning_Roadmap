import Roadmap from "../models/Roadmap.js";
import fetch from "node-fetch";

// Create roadmap manually
export const createManualRoadmap = async (req, res) => {
  try {
    const roadmap = await Roadmap.create({
      ...req.body,
      mode: "Manual",
      userId: req.user.id
    });
    res.json(roadmap);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create roadmap using AI
export const createAIRoadmap = async (req, res) => {
  try {
    const { topic, duration = "1 month", level = "beginner" } = req.body;
    
    const fastapiUrl = `${process.env.FASTAPI_URL}/generate-roadmap`;
    
    console.log("Calling FastAPI:", fastapiUrl);
    
    const response = await fetch(fastapiUrl, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ 
        topic: topic,
        duration: duration,
        level: level 
      })
    });

    if (!response.ok) {
      throw new Error(`FastAPI error: ${response.status}`);
    }

    const data = await response.json();
    console.log("FastAPI response success:", data.success);
    
    if (!data.roadmap || !data.roadmap.nodes) {
      return res.status(500).json({
        message: "No roadmap data received from AI service"
      });
    }

    // Save to DB - direct mapping
    const roadmap = await Roadmap.create({
      userId: req.user?.id || "dummy",
      title: data.roadmap.title || `Learn ${topic}`,
      mode: "AI",
      description: `AI-generated roadmap for ${topic}`,
      nodes: data.roadmap.nodes,
      progress: {
        totalNodes: data.roadmap.nodes.length,
        completedNodes: 0,
        percentage: 0
      }
    });

    res.json({
      message: data.message,
      roadmap: roadmap
    });
    
  } catch (err) {
    console.error("Error in createAIRoadmap:", err);
    res.status(500).json({ 
      message: "Error generating roadmap",
      error: err.message 
    });
  }
};

// Get all roadmaps for a user
export const getRoadmaps = async (req, res) => {
  try {
    const maps = await Roadmap.find({ userId: req.user.id });
    res.json(maps);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};