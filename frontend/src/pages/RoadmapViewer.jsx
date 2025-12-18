import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Brain, Check } from "lucide-react";
import DashboardNavbar from "@/components/layout/DashboardNavbar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const RoadmapViewer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const roadmap = location.state?.roadmap;
  const topic = location.state?.topic || "your topic";

  if (!roadmap) {
    return (
      <div className="w-full min-h-screen bg-blue-50">
        <DashboardNavbar />
        <div className="max-w-5xl mx-auto mt-10 px-6">
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-gray-600">No roadmap data found. Please generate a roadmap first.</p>
              <Button onClick={() => navigate("/login/userPage")} className="mt-4">
                Back to Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const steps = roadmap.nodes || [];

  return (
    <div className="w-full min-h-screen bg-blue-50 pb-16">
      <DashboardNavbar />
      
      <div className="max-w-5xl mx-auto mt-10 px-6">
        {/* Header Section */}
        <div className="mb-8">
          <Button
            onClick={() => navigate("/login/userPage")}
            variant="outline"
            className="mb-6"
          >
            Back to Dashboard
          </Button>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Your {topic} Learning Roadmap
          </h1>
          <p className="text-lg text-gray-600">
            AI-generated personalized path to master {topic}
          </p>
        </div>

        {/* Learning Path Card */}
        <Card className="border-blue-200 bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Brain className="w-5 h-5 text-blue-600" />
              Your Learning Path
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {steps.map((step, index) => (
                <div
                  key={step.id || index}
                  className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {/* Step Number */}
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                    {index + 1}
                  </div>
                  
                  {/* Step Content */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {step.title}
                    </h3>
                    {step.description && (
                      <p className="text-sm text-gray-600">
                        {step.description}
                      </p>
                    )}
                    {step.estimatedTime && (
                      <p className="text-xs text-gray-500 mt-1">
                        Estimated time: {step.estimatedTime} hours
                      </p>
                    )}
                  </div>
                  
                  {/* Checkmark */}
                  <div className="flex-shrink-0">
                    <Check className="w-5 h-5 text-gray-300" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RoadmapViewer;

