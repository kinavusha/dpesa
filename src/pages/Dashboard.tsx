import { Bell, User, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useDerivAPI } from "@/hooks/useDerivAPI";

const Dashboard = () => {
  const { balance, isLoading } = useDerivAPI();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 px-6 py-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex flex-col">
            <span className="text-gray-600 dark:text-gray-400 mb-2">Welcome back</span>
            <span className="font-medium dark:text-white">Brian Kinavusha</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/notifications" className="relative">
              <Bell size={24} className="text-gray-600 dark:text-gray-400" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                2
              </span>
            </Link>
            <Link to="/settings">
              <User size={24} className="text-gray-600 dark:text-gray-400" />
            </Link>
          </div>
        </div>

        {/* Balance */}
        <div className="mb-8">
          <div className="text-gray-600 dark:text-gray-400 mb-3">Deriv Balance</div>
          {isLoading ? (
            <div className="animate-pulse h-10 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
          ) : (
            <div className="text-4xl font-bold mb-1 dark:text-white">
              $ {balance?.toFixed(2) || '0.00'}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <Link
            to="/deposit"
            className="bg-green-600 text-white py-3 rounded-lg text-center font-medium hover:bg-green-700 transition-colors"
          >
            Deposit
          </Link>
          <Link
            to="/withdraw"
            className="bg-red-600 text-white py-3 rounded-lg text-center font-medium hover:bg-red-700 transition-colors"
          >
            Withdraw
          </Link>
        </div>

        {/* Transactions */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Transactions</h2>
            <Link to="/history" className="text-dpesa-deriv-blue hover:underline">
              View all
            </Link>
          </div>
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm"
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      transaction.type === "deposit"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {transaction.type === "deposit" ? <ArrowDownLeft size={24} /> : <ArrowUpRight size={24} />}
                  </div>
                  <div>
                    <div className="font-medium">
                      {transaction.type === "deposit" ? "Deposit" : "Withdraw"}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{transaction.date}</div>
                  </div>
                </div>
                <div
                  className={`font-semibold ${
                    transaction.type === "deposit" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {transaction.type === "deposit" ? "+" : "-"}${transaction.amount.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Navbar />
    </div>
  );
};

const transactions = [
  {
    id: 1,
    type: "deposit",
    amount: 2.00,
    date: "Thu Mar 07 2024 at 00:22:19"
  },
  {
    id: 2,
    type: "withdraw",
    amount: 2.00,
    date: "Thu Mar 07 2024 at 00:21:38"
  },
  {
    id: 3,
    type: "deposit",
    amount: 2.00,
    date: "Thu Mar 07 2024 at 00:20:24"
  },
  {
    id: 4,
    type: "withdraw",
    amount: 2.00,
    date: "Thu Mar 07 2024 at 00:19:22"
  }
];

export default Dashboard;
