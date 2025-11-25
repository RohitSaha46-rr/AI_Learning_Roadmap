import { Link } from "react-router-dom";
import { Brain, Target, TrendingUp } from "lucide-react";

import FeatureCard from "@/components/landing/FeatureCard";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";

export default function Landing() {
  const features = [
    {
      id: "ai-roadmaps",
      title: "AI-Generated Roadmaps",
      description:
        "Get personalized learning paths created by AI, tailored to your chosen technology and skill level.",
      icon: Brain,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      id: "step-learning",
      title: "Step-by-Step Learning",
      description:
        "Progress through topics one at a time with gated content that unlocks as you complete each lesson.",
      icon: Target,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
    },
    {
      id: "track-progress",
      title: "Track Your Progress",
      description:
        "Monitor your learning journey with detailed progress tracking and visual indicators for each course.",
      icon: TrendingUp,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto text-center mt-24 px-4">
        <h1 className="text-5xl font-bold leading-tight text-gray-900">
          AI-Powered Learning{" "}
          <span className="text-[#11a4d4]">Personalized for You</span>
        </h1>

        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          Master any technology with AI-generated roadmaps, step-by-step lessons,  
          and adaptive learning paths tailored to your goals.
        </p>

        <div className="flex gap-4 justify-center mt-10">
          <Button
            asChild
            className="px-6 py-3 text-base rounded-lg bg-[#11a4d4] hover:bg-[#0f8bb8] text-white"
          >
            <Link to="/signup">Start Learning Free</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="px-6 py-3 text-base rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-gray-700"
          >
            <Link to="/login">Sign In</Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto mt-32 px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <FeatureCard key={feature.id} {...feature} />
          ))}
        </div>
      </section>
    </div>
  );
}
