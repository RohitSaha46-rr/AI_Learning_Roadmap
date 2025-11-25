import { Link } from "react-router-dom";
import { Brain } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <header className="w-full py-4 flex items-center justify-between px-8 bg-slate-50">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <Brain className="w-6 h-6 text-blue-600" />
        <span className="text-2xl font-bold text-gray-900">LearnAI</span>
      </Link>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        <Link to="/login" className="text-sm text-gray-900 hover:text-gray-700 font-medium">
          Login
        </Link>
        <Button asChild className="bg-[#11a4d4] hover:bg-[#0f8bb8] rounded-lg px-4 py-2">
          <Link to="/signup">Get Started</Link>
        </Button>
      </div>
    </header>
  );
}
