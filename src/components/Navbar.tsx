import { Link, useLocation } from "react-router-dom";
import { Home, Wallet, History, Settings } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-dpesa-deriv-blue py-3">
      <div className="container max-w-md mx-auto px-6">
        <div className="flex justify-between items-center">
          <Link
            to="/dashboard"
            className={`flex flex-col items-center space-y-1 text-dpesa-white hover:bg-dpesa-bright-red hover:bg-opacity-90 rounded-lg p-2 transition-colors ${
              isActive("/dashboard") ? "bg-dpesa-bright-red" : ""
            }`}
          >
            <Home size={24} />
            <span className="text-xs">Home</span>
          </Link>
          
          <Link
            to="/deposit"
            className={`flex flex-col items-center space-y-1 text-dpesa-white hover:bg-dpesa-bright-red hover:bg-opacity-90 rounded-lg p-2 transition-colors ${
              isActive("/deposit") ? "bg-dpesa-bright-red" : ""
            }`}
          >
            <Wallet size={24} />
            <span className="text-xs">Deposit</span>
          </Link>
          
          <Link
            to="/history"
            className={`flex flex-col items-center space-y-1 text-dpesa-white hover:bg-dpesa-bright-red hover:bg-opacity-90 rounded-lg p-2 transition-colors ${
              isActive("/history") ? "bg-dpesa-bright-red" : ""
            }`}
          >
            <History size={24} />
            <span className="text-xs">History</span>
          </Link>
          
          <Link
            to="/settings"
            className={`flex flex-col items-center space-y-1 text-dpesa-white hover:bg-dpesa-bright-red hover:bg-opacity-90 rounded-lg p-2 transition-colors ${
              isActive("/settings") ? "bg-dpesa-bright-red" : ""
            }`}
          >
            <Settings size={24} />
            <span className="text-xs">Settings</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;