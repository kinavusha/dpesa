import { Link, useLocation } from "react-router-dom";
import { Home, Wallet, History, Settings } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-3">
      <div className="container max-w-md mx-auto px-6">
        <div className="flex justify-between items-center">
          <Link
            to="/dashboard"
            className={`flex flex-col items-center space-y-1 ${
              isActive("/dashboard") ? "text-dpesa-primary" : "text-gray-500"
            }`}
          >
            <Home size={24} />
            <span className="text-xs">Home</span>
          </Link>
          
          <Link
            to="/deposit"
            className={`flex flex-col items-center space-y-1 ${
              isActive("/deposit") ? "text-dpesa-primary" : "text-gray-500"
            }`}
          >
            <Wallet size={24} />
            <span className="text-xs">Deposit</span>
          </Link>
          
          <Link
            to="/history"
            className={`flex flex-col items-center space-y-1 ${
              isActive("/history") ? "text-dpesa-primary" : "text-gray-500"
            }`}
          >
            <History size={24} />
            <span className="text-xs">History</span>
          </Link>
          
          <Link
            to="/settings"
            className={`flex flex-col items-center space-y-1 ${
              isActive("/settings") ? "text-dpesa-primary" : "text-gray-500"
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