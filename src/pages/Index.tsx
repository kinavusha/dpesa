import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const DERIV_APP_ID = "65840";
const DERIV_OAUTH_URL = `https://oauth.deriv.com/oauth2/authorize?app_id=${DERIV_APP_ID}`;

const Index = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Handle OAuth redirect
    const handleOAuthRedirect = async () => {
      const acct = searchParams.get('acct1');
      const token = searchParams.get('token1');
      const currency = searchParams.get('cur1');

      if (acct && token && currency) {
        setIsLoading(true);
        try {
          // First create or get the user in Supabase
          const { data: { user }, error: authError } = await supabase.auth.signUp({
            email: `${acct}@deriv.user`,
            password: token.slice(0, 20), // Use part of the token as password
          });

          if (authError && authError.message !== 'User already registered') {
            throw authError;
          }

          // Store the Deriv account details
          const { error: profileError } = await supabase
            .from('profiles')
            .upsert({
              id: user?.id,
              deriv_account_id: acct,
              deriv_token: token,
              deriv_currency: currency,
              is_virtual: false,
            });

          if (profileError) throw profileError;

          toast.success("Successfully logged in!");
          navigate("/dashboard");
        } catch (error) {
          console.error('OAuth error:', error);
          toast.error("Failed to login. Please try again.");
        } finally {
          setIsLoading(false);
        }
      }
    };

    handleOAuthRedirect();
  }, [searchParams, navigate]);

  const handleDerivLogin = () => {
    window.location.href = DERIV_OAUTH_URL;
  };

  return (
    <div className="min-h-screen flex flex-col justify-center bg-gray-50 dark:bg-gray-900 px-6">
      <div className="max-w-md w-full mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-dpesa-dark-gray dark:text-white mb-2">Dpesa</h1>
          <p className="text-gray-600 dark:text-gray-300">Welcome! Please login with your Deriv account to continue.</p>
          
          <div className="mt-6 mb-8 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
            <img 
              src="https://www.kinovadigitalmarketing.com/wp-content/uploads/2024/11/download.webp"
              alt="Dpesa Welcome"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 animate-fade-in">
          {isLoading ? (
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-300">Logging you in...</p>
            </div>
          ) : (
            <button 
              onClick={handleDerivLogin}
              className="w-full px-6 py-3 bg-dpesa-bright-red text-white rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
            >
              Login with Deriv
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;