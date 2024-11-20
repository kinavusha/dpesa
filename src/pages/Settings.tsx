import { useState } from "react";
import { toast } from "sonner";
import Navbar from "../components/Navbar";

const Settings = () => {
  const [notifications, setNotifications] = useState(true);

  const handleLogout = () => {
    toast.success("Logged out successfully");
    // In a real app, this would clear the auth state
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="container max-w-md mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold text-dpesa-text mb-6">Settings</h1>

        <div className="space-y-6">
          <div className="dpesa-card">
            <h2 className="text-lg font-semibold text-dpesa-text mb-4">Notifications</h2>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Push Notifications</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={() => setNotifications(!notifications)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-dpesa-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-dpesa-primary"></div>
              </label>
            </div>
          </div>

          <div className="dpesa-card">
            <h2 className="text-lg font-semibold text-dpesa-text mb-4">Account</h2>
            <div className="space-y-4">
              <button className="w-full text-left text-dpesa-secondary hover:underline">
                Change Password
              </button>
              <button className="w-full text-left text-dpesa-secondary hover:underline">
                Update Profile
              </button>
              <button
                onClick={handleLogout}
                className="w-full dpesa-button-danger"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default Settings;