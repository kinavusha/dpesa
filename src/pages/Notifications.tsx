import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      title: "Successful Deposit",
      message: "Your deposit of $2.00 was successful",
      time: "2 minutes ago",
      read: false
    },
    {
      id: 2,
      title: "Withdrawal Completed",
      message: "Your withdrawal of $2.00 has been processed",
      time: "1 hour ago",
      read: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 px-6 py-4 flex items-center space-x-4 border-b dark:border-gray-700">
        <Link to="/dashboard">
          <ArrowLeft size={24} className="text-gray-600 dark:text-gray-300" />
        </Link>
        <h1 className="text-xl font-semibold dark:text-white">Notifications</h1>
      </div>

      <div className="p-6 space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm ${
              !notification.read ? "border-l-4 border-dpesa-bright-red" : ""
            }`}
          >
            <h3 className="font-medium dark:text-white">{notification.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">{notification.message}</p>
            <span className="text-xs text-gray-500 dark:text-gray-400">{notification.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;