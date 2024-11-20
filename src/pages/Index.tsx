import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      // In a real app, this would validate credentials
      toast.success("Login successful!");
      navigate("/dashboard");
    } else {
      toast.error("Please fill in all fields");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center bg-gray-50 px-6">
      <div className="max-w-md w-full mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-dpesa-text mb-2">Dpesa</h1>
          <p className="text-gray-600">Welcome back! Please login to continue.</p>
        </div>

        <div className="dpesa-card">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="dpesa-input"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="dpesa-input"
                placeholder="Enter your password"
              />
            </div>

            <button type="submit" className="dpesa-button-primary w-full">
              Login
            </button>
          </form>

          <div className="mt-6 text-center">
            <button className="text-dpesa-secondary hover:underline">
              Forgot your password?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;