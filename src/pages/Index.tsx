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
      toast.success("Login successful!");
      navigate("/dashboard");
    } else {
      toast.error("Please fill in all fields");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center bg-gray-50 dark:bg-gray-900 px-6">
      <div className="max-w-md w-full mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-dpesa-dark-gray dark:text-white mb-2">Dpesa</h1>
          <p className="text-gray-600 dark:text-gray-300">Welcome back! Please login to continue.</p>
          
          {/* Image container below headline */}
          <div className="mt-6 mb-8 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
            <img 
              src="https://www.kinovadigitalmarketing.com/wp-content/uploads/2024/11/download.webp"
              alt="Dpesa Welcome"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 animate-fade-in">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
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
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
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

            {/* Login and Sign Up buttons side by side */}
            <div className="flex gap-4 justify-between">
              <button 
                type="submit" 
                className="flex-1 px-4 py-2 text-sm rounded-lg font-semibold text-dpesa-white bg-dpesa-bright-red hover:bg-opacity-90 transition-colors"
              >
                Login
              </button>
              
              <button 
                type="button"
                className="flex-1 px-4 py-2 text-sm rounded-lg font-semibold text-dpesa-dark-gray dark:text-white bg-dpesa-light-gray dark:bg-gray-700 hover:bg-opacity-90 transition-colors"
              >
                Sign Up
              </button>
            </div>
          </form>

          {/* Forgot Password as a text link */}
          <div className="mt-6 text-center">
            <a 
              href="#" 
              className="text-sm text-dpesa-deriv-blue dark:text-blue-400 hover:underline"
            >
              Forgot Password?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;