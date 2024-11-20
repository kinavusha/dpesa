import { Wallet, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="container max-w-md mx-auto px-6 py-8">
        <div className="dpesa-card mb-6">
          <h2 className="text-lg font-semibold text-gray-600 mb-2">Available Balance</h2>
          <div className="text-4xl font-bold text-dpesa-text mb-4">$1,234.56</div>
          
          <div className="grid grid-cols-2 gap-4">
            <Link
              to="/deposit"
              className="flex items-center justify-center space-x-2 bg-dpesa-primary text-white rounded-lg py-3 px-4 hover:opacity-90 transition-opacity"
            >
              <ArrowDownLeft size={20} />
              <span>Deposit</span>
            </Link>
            
            <Link
              to="/withdraw"
              className="flex items-center justify-center space-x-2 bg-dpesa-secondary text-white rounded-lg py-3 px-4 hover:opacity-90 transition-opacity"
            >
              <ArrowUpRight size={20} />
              <span>Withdraw</span>
            </Link>
          </div>
        </div>

        <div className="dpesa-card">
          <h2 className="text-lg font-semibold text-gray-600 mb-4">Recent Transactions</h2>
          
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="bg-dpesa-primary bg-opacity-10 p-2 rounded-full">
                    <Wallet size={20} className="text-dpesa-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-dpesa-text">
                      {i % 2 === 0 ? "Deposit" : "Withdrawal"}
                    </div>
                    <div className="text-sm text-gray-500">Mar {i + 10}, 2024</div>
                  </div>
                </div>
                <div className={`font-semibold ${i % 2 === 0 ? "text-green-500" : "text-red-500"}`}>
                  {i % 2 === 0 ? "+" : "-"}$
                  {(i * 100).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <Link
            to="/history"
            className="block text-center text-dpesa-secondary font-medium mt-4 hover:underline"
          >
            View All Transactions
          </Link>
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default Dashboard;