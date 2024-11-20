import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Navbar from "../components/Navbar";

const Deposit = () => {
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount && Number(amount) > 0) {
      toast.success(`Successfully deposited $${amount}`);
      navigate("/dashboard");
    } else {
      toast.error("Please enter a valid amount");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="container max-w-md mx-auto px-6 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 mb-6"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back
        </button>

        <div className="dpesa-card">
          <h1 className="text-2xl font-bold text-dpesa-text mb-6">Deposit Funds</h1>

          <form onSubmit={handleDeposit} className="space-y-6">
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                Amount to Deposit
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="dpesa-input pl-8"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                />
              </div>
            </div>

            <button type="submit" className="dpesa-button-primary w-full">
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