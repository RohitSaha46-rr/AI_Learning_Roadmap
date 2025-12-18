import mongoose from "mongoose";

const NodeSchema = new mongoose.Schema({
  id: String,
  title: String,
  description: String,
  difficulty: String,
  estimatedTime: Number,
  status: { type: String, default: "pending" },
  color: String,
  size: { width: Number, height: Number },
  position: { x: Number, y: Number },
  connections: [String],
  resources: [String],
  week: Number
});

const RoadmapSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: false 
  },
  title: String,
  mode: { 
    type: String, 
    enum: ["AI", "Manual"], 
    required: true 
  },
  description: String,
  nodes: [NodeSchema],
  progress: {
    totalNodes: Number,
    completedNodes: { type: Number, default: 0 },
    percentage: { type: Number, default: 0 }
  }
}, { 
  timestamps: true 
});

// Auto-calculate progress before save
RoadmapSchema.pre('save', function(next) {
  if (this.nodes && this.nodes.length > 0) {
    const completedNodes = this.nodes.filter(node => node.status === 'completed').length;
    this.progress = {
      totalNodes: this.nodes.length,
      completedNodes: completedNodes,
      percentage: Math.round((completedNodes / this.nodes.length) * 100)
    };
  }
  next();
});

export default mongoose.model("Roadmap", RoadmapSchema);