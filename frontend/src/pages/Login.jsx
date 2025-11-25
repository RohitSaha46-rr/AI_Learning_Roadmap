import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Brain } from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginUser } from "@/services/api";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    identifier: location.state?.email || "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      setLoading(true);
      await loginUser(formData);
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50">
      <Navbar />
      <div className="flex justify-center items-center px-4 py-12">
        <Card className="w-full max-w-md border border-slate-100 shadow-lg">
          <CardHeader className="space-y-3 text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-sky-100 flex items-center justify-center">
              <Brain className="w-6 h-6 text-[#11a4d4]" />
            </div>
            <CardTitle className="text-2xl text-gray-900">Welcome Back</CardTitle>
            <p className="text-sm text-gray-500">
              Sign in with the credentials you used to create your account
            </p>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2 text-left">
                <Label htmlFor="identifier" className="text-sm font-semibold text-gray-700">
                  Email or Username
                </Label>
                <Input
                  id="identifier"
                  name="identifier"
                  placeholder="you@example.com"
                  value={formData.identifier}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2 text-left">
                <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              {error && (
                <p className="text-sm text-red-500 text-center" role="alert">
                  {error}
                </p>
              )}

              <Button
                type="submit"
                className="w-full h-12 text-base bg-[#11a4d4] hover:bg-[#0f8bb8]"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
            <p className="text-center text-sm text-gray-600 mt-6">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-[#11a4d4] font-semibold hover:underline">
                Create one
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

