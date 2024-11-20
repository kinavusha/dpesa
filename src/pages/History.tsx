import { ArrowUpRight, ArrowDownLeft } from "lucide-react";
import Navbar from "../components/Navbar";

const transactions = [
  {
    id: 1,
    type: "deposit",
    amount: 500,
    date: "2024-03-15",
    status: "completed"
  },
  {
    id: 2,
    type: "withdrawal",
    amount: 200,
    date: "2024-03-14",
    status: "completed"
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
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="container max-w-md mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold text-dpesa-text mb-6">Transaction History</h1>

        <div className="space-y-4">
          {transactions.map((transaction) => (
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
                      {new Date(transaction.date).toLocaleDateString()}
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