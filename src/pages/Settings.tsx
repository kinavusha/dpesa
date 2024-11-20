import { useState } from "react";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import Navbar from "../components/Navbar";

const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = () => {
    toast.success("Logged out successfully");
    window.location.href = "/";
  };

  const toggleDarkMode = (checked: boolean) => {
    setDarkMode(checked);
    if (checked) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    toast.success(`Dark mode ${checked ? 'enabled' : 'disabled'}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      <div className="container max-w-md mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold text-dpesa-dark-gray dark:text-white mb-6">Settings</h1>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 animate-fade-in">
            <h2 className="text-lg font-semibold text-dpesa-dark-gray dark:text-white mb-4">Appearance</h2>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-300">Dark Mode</span>
              <Switch
                checked={darkMode}
                onCheckedChange={toggleDarkMode}
                className="bg-dpesa-light-gray data-[state=checked]:bg-dpesa-deriv-blue"
              />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 animate-fade-in">
            <h2 className="text-lg font-semibold text-dpesa-dark-gray dark:text-white mb-4">Notifications</h2>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-300">Push Notifications</span>
              <Switch
                checked={notifications}
                onCheckedChange={setNotifications}
                className="bg-dpesa-light-gray data-[state=checked]:bg-dpesa-deriv-blue"
              />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 animate-fade-in">
            <h2 className="text-lg font-semibold text-dpesa-dark-gray dark:text-white mb-4">Account</h2>
            <div className="space-y-4">
              <button className="w-full text-left text-dpesa-deriv-blue dark:text-dpesa-light-red hover:underline">
                Change Password
              </button>
              <button className="w-full text-left text-dpesa-deriv-blue dark:text-dpesa-light-red hover:underline">
                Update Profile
              </button>
              <button
                onClick={handleLogout}
                className="w-full px-6 py-3 rounded-lg font-semibold text-dpesa-white bg-dpesa-bright-red hover:bg-opacity-90 transition-colors"
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