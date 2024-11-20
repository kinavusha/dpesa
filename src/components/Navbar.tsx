import { Link, useLocation } from "react-router-dom";
import { Home, History, User, Wallet } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white py-3 border-t border-gray-200">
      <div className="container max-w-md mx-auto px-6">
        <div className="flex justify-between items-center">
          <Link
            to="/dashboard"
            className={`flex flex-col items-center space-y-1 text-dpesa-deriv-blue hover:text-dpesa-bright-red transition-colors ${
              isActive("/dashboard") ? "text-dpesa-bright-red" : ""
            }`}
          >
            <Home size={24} />
            <span className="text-xs">Home</span>
          </Link>
          
          <Link
            to="/history"
            className={`flex flex-col items-center space-y-1 text-dpesa-deriv-blue hover:text-dpesa-bright-red transition-colors ${
              isActive("/history") ? "text-dpesa-bright-red" : ""
            }`}
          >
            <History size={24} />
            <span className="text-xs">History</span>
          </Link>
          
          <Link
            to="/settings"
            className={`flex flex-col items-center space-y-1 text-dpesa-deriv-blue hover:text-dpesa-bright-red transition-colors ${
              isActive("/settings") ? "text-dpesa-bright-red" : ""
            }`}
          >
            <User size={24} />
            <span className="text-xs">Account</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;