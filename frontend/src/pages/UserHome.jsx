import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Sparkles, Book, Brain } from "lucide-react";
import DashboardNavbar from "@/components/layout/DashboardNavbar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from 'react-router-dom';
import { useGenerateRoadmapMutation } from "@/features/roadmap/roadmapApiSlice";

const UserHome = () => {
  const { user, token } = useSelector((state) => state.auth || {});
  const [learningInput, setLearningInput] = useState("");
  const navigate = useNavigate();
  const [generateRoadmap, { isLoading }] = useGenerateRoadmapMutation();

  const handleGenerateRoadmap = async () => {
    if (!learningInput.trim()) {
      return;
    }

    // Check token from both Redux and localStorage
    const authData = JSON.parse(localStorage.getItem("authUser") || "{}");
    const currentToken = token || authData?.token;
    
    console.log("🔍 Checking token before API call:");
    console.log("  - Redux token:", token ? "✅ Found" : "❌ Not found");
    console.log("  - localStorage token:", authData?.token ? "✅ Found" : "❌ Not found");
    console.log("  - Using token:", currentToken ? "✅ Yes" : "❌ No");

    if (!currentToken) {
      console.error("❌ No token found. Please login again.");
      navigate("/login");
      return;
    }

    try {
      console.log("🚀 Calling generateRoadmap API...");
      const result = await generateRoadmap({ topic: learningInput.trim() }).unwrap();
      console.log("✅ Roadmap generated successfully:", result);
      navigate("/roadmap/new", { state: { roadmap: result.roadmap, topic: learningInput.trim() } });
    } catch (error) {
      console.error("❌ Error generating roadmap:", error);
      console.error("  - Status:", error.status);
      console.error("  - Data:", error.data);
      if (error.status === 401) {
        console.error("⚠️ Unauthorized - token may be invalid or expired");
        // Try to reload token from localStorage
        const freshAuth = JSON.parse(localStorage.getItem("authUser") || "{}");
        console.log("  - Fresh token check:", freshAuth?.token ? "Found" : "Not found");
      }
    }
  };

  return (
    <div className="w-full min-h-screen bg-blue-50 pb-16">
      <DashboardNavbar />
      
      {/* Welcome Section */}
      <section className="max-w-5xl mx-auto mt-10 px-6 ">
        <h1 className="text-4xl font-bold text-gray-900">
          Welcome back, {user?.username ?? "Guest"}! 👋
        </h1>

        <p className="text-gray-600 mt-2 text-lg">
          Continue your learning journey or start something new
        </p>

        {/* Start Learning Card */}
        <Card className="mt-8 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Sparkles className="w-5 h-5 text-blue-600" />
              Start Learning
            </CardTitle>
            <CardDescription>
              Tell us what you want to learn and we'll create a personalized roadmap
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3">
              <Input
                value={learningInput}
                onChange={(e) => setLearningInput(e.target.value)}
                placeholder="I want to learn React..."
                className="flex-1"
              />
              <Button 
                onClick={handleGenerateRoadmap}
                variant="customBlue"
                className="gap-2"
                disabled={isLoading || !learningInput.trim()}
              >
                <Brain className="w-4 h-4" />
                {isLoading ? "Generating..." : "Generate Roadmap"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* My Courses Card */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Book className="w-5 h-5 text-blue-600" />
              My Courses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-12">
              <Brain className="w-20 h-20 text-gray-300 mb-4" />
              <p className="text-lg font-medium text-gray-900 mb-2">No courses yet</p>
              <p className="text-sm text-gray-500 text-center max-w-md">
                Start your learning journey by generating your first roadmap above
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

export default UserHome