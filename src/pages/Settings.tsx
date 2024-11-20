import { useState } from "react";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { MessageSquare } from "lucide-react";
import Navbar from "../components/Navbar";

const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = () => {
    toast.success("Logged out successfully");
    window.location.href = "/";
  };

  const handleWhatsAppSupport = () => {
    window.open("https://wa.me/254113413967", "_blank");
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
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Settings</h1>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Support</h2>
            <button
              onClick={handleWhatsAppSupport}
              className="w-full flex items-center justify-between text-left text-dpesa-deriv-blue dark:text-dpesa-light-red hover:underline"
            >
              <span>WhatsApp Support</span>
              <MessageSquare size={20} />
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Appearance</h2>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-300">Dark Mode</span>
              <Switch
                checked={darkMode}
                onCheckedChange={toggleDarkMode}
              />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Notifications</h2>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-300">Push Notifications</span>
              <Switch
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <button
              onClick={handleLogout}
              className="w-full px-6 py-3 rounded-lg font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default Settings;