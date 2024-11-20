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
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white px-6 py-4 flex items-center space-x-4 border-b">
        <Link to="/dashboard">
          <ArrowLeft size={24} className="text-gray-600" />
        </Link>
        <h1 className="text-xl font-semibold">Notifications</h1>
      </div>

      <div className="p-6 space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`bg-white p-4 rounded-lg shadow-sm ${
              !notification.read ? "border-l-4 border-dpesa-bright-red" : ""
            }`}
          >
            <h3 className="font-medium mb-1">{notification.title}</h3>
            <p className="text-gray-600 text-sm mb-2">{notification.message}</p>
            <span className="text-xs text-gray-500">{notification.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;