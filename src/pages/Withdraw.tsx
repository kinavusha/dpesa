import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Navbar from "../components/Navbar";

const Withdraw = () => {
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount && Number(amount) > 0) {
      toast.success(`Successfully withdrew $${amount}`);
      navigate("/dashboard");
    } else {
      toast.error("Please enter a valid amount");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      <div className="container max-w-md mx-auto px-6 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 dark:text-gray-300 mb-6"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back
        </button>

        <div className="dpesa-card dark:bg-gray-800">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Withdraw Funds</h1>

          <form onSubmit={handleWithdraw} className="space-y-6">
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Amount to Withdraw
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">$</span>
                <input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="dpesa-input pl-8 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                />
              </div>
            </div>

            <button type="submit" className="dpesa-button-danger w-full">
              Withdraw
            </button>
          </form>
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default Withdraw;