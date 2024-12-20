import { useState } from "react";
import { ArrowLeft, Bell, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Navbar from "../components/Navbar";

const Deposit = () => {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const navigate = useNavigate();

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount && Number(amount) > 0) {
      toast.success(`Successfully deposited ${currency} ${amount}`);
      navigate("/dashboard");
    } else {
      toast.error("Please enter a valid amount");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      <div className="bg-white dark:bg-gray-800 px-6 py-4 flex justify-between items-center shadow-sm">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 dark:text-gray-400"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back
        </button>
        <div className="flex items-center space-x-4">
          <Bell size={24} className="text-gray-600 dark:text-gray-400" />
          <User size={24} className="text-gray-600 dark:text-gray-400" />
        </div>
      </div>

      <div className="container max-w-md mx-auto px-6 py-8">
        <div className="dpesa-card dark:bg-gray-800">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Deposit Funds</h1>

          <form onSubmit={handleDeposit} className="space-y-6">
            <div>
              <label htmlFor="currency" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Select Currency
              </label>
              <select
                id="currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="dpesa-input dark:bg-gray-700 dark:text-white"
              >
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">GBP - British Pound</option>
                <option value="KES">KES - Kenyan Shilling</option>
              </select>
            </div>

            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Amount to Deposit
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                  {currency === 'USD' ? '$' : currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : 'KES'}
                </span>
                <input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="dpesa-input pl-12 dark:bg-gray-700 dark:text-white"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                />
              </div>
              {amount && (
                <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  ≈ ${(Number(amount) * (currency === 'USD' ? 1 : currency === 'EUR' ? 1.1 : currency === 'GBP' ? 1.27 : 0.0071)).toFixed(2)} USD
                </div>
              )}
            </div>

            <button type="submit" className="w-full px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors">
              Deposit
            </button>
          </form>
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default Deposit;