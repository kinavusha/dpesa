import { ArrowUpRight, ArrowDownLeft, Bell, User } from "lucide-react";
import { useState } from "react";
import Navbar from "../components/Navbar";

const transactions = [
  {
    id: 1,
    type: "withdrawal",
    amount: 10.03,
    date: "2024-03-15",
    status: "completed",
    reference: "CR3775256",
    country: "KE"
  },
  {
    id: 2,
    type: "deposit",
    amount: 5.03,
    date: "2024-03-14",
    status: "completed",
    reference: "CR3775256",
    country: "US"
  },
  {
    id: 3,
    type: "deposit",
    amount: 1000,
    date: "2024-03-13",
    status: "completed"
  },
  {
    id: 4,
    type: "withdrawal",
    amount: 150,
    date: "2024-03-12",
    status: "completed"
  },
  {
    id: 5,
    type: "deposit",
    amount: 300,
    date: "2024-03-11",
    status: "completed"
  }
];

const History = () => {
  const [activeTab, setActiveTab] = useState<'deposits' | 'withdrawals'>('deposits');
  
  const filteredTransactions = transactions.filter(t => 
    activeTab === 'deposits' ? t.type === 'deposit' : t.type === 'withdrawal'
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white px-6 py-4 flex justify-between items-center shadow-sm">
        <h1 className="text-xl font-semibold">Transaction History</h1>
        <div className="flex items-center space-x-4">
          <button className="relative">
            <Bell size={24} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              2
            </span>
          </button>
          <User size={24} />
        </div>
      </div>

      <div className="container max-w-md mx-auto px-6 py-4">
        <div className="flex space-x-2 mb-6">
          <button
            onClick={() => setActiveTab('deposits')}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
              activeTab === 'deposits'
                ? 'bg-dpesa-bright-red text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            Deposits
          </button>
          <button
            onClick={() => setActiveTab('withdrawals')}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
              activeTab === 'withdrawals'
                ? 'bg-dpesa-bright-red text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            Withdrawals
          </button>
        </div>

        <div className="space-y-4">
          {filteredTransactions.map((transaction) => (
            <div key={transaction.id} className="dpesa-card">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className={`p-2 rounded-full ${
                      transaction.type === "deposit"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {transaction.type === "deposit" ? (
                      <ArrowDownLeft size={20} />
                    ) : (
                      <ArrowUpRight size={20} />
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-dpesa-text capitalize">
                      {transaction.type}
                    </div>
                    <div className="text-sm text-gray-500">
                      REF: {transaction.reference}
                    </div>
                  </div>
                </div>
                <div
                  className={`font-semibold ${
                    transaction.type === "deposit" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {transaction.type === "deposit" ? "+" : "-"}${transaction.amount.toFixed(2)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default History;
