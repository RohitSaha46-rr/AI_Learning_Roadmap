import { LogOut, Brain } from "lucide-react";

export default function DashboardNavbar() {
  return (
    <header className="w-full py-4 flex items-center justify-between px-10 bg-white/70 backdrop-blur-sm border-b">
      
      {/* Logo */}
      <div className="flex items-center gap-2 cursor-pointer">
        <Brain className="w-7 h-7 text-sky-600" />
        <span className="text-2xl font-bold text-gray-900">LearnAI</span>
      </div>

      {/* Right Side Logout */}
      <button className="flex items-center gap-2 text-gray-700 hover:text-gray-900 text-sm font-medium">
        <LogOut size={18} />
        Logout
      </button>
    </header>
  );
}
