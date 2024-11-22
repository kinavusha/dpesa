import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

const DERIV_APP_ID = "65840";
const DERIV_OAUTH_URL = `https://oauth.deriv.com/oauth2/authorize?app_id=${DERIV_APP_ID}&redirect_uri=${encodeURIComponent("https://dpesa.lovable.app/dashboard")}`;

const Index = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        toast.error("Failed to get session: " + error.message);
        return;
      }
      setSession(session);
      if (session) {
        toast.success("Welcome back!");
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        toast.success("Successfully signed in!");
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const handleOAuthRedirect = async () => {
      // Extract all account parameters from URL
      const params = new URLSearchParams(window.location.search);
      const accounts = [];
      let i = 1;
      
      while (params.has(`acct${i}`) && params.has(`token${i}`) && params.has(`cur${i}`)) {
        accounts.push({
          account: params.get(`acct${i}`),
          token: params.get(`token${i}`),
          currency: params.get(`cur${i}`)
        });
        i++;
      }

      if (accounts.length > 0 && session?.user) {
        setIsLoading(true);
        try {
          // Connect to Deriv WebSocket with the first account's token
          const ws = new WebSocket(`wss://ws.derivws.com/websockets/v3?app_id=${DERIV_APP_ID}`);
          
          ws.onopen = () => {
            ws.send(JSON.stringify({ 
              authorize: accounts[0].token 
            }));
          };

          ws.onmessage = async (msg) => {
            const data = JSON.parse(msg.data);
            if (data.error) {
              throw new Error(data.error.message);
            }
            
            if (data.msg_type === 'authorize') {
              const { 
                authorize: { 
                  email: deriv_email, 
                  user_id: deriv_user_id,
                  fullname,
                  account_list,
                  balance,
                  currency
                } 
              } = data;

              // Update profile with Deriv account information
              const { error: profileError } = await supabase
                .from('profiles')
                .upsert({
                  id: session.user.id,
                  deriv_account_id: accounts[0].account,
                  deriv_token: accounts[0].token,
                  deriv_currency: currency,
                  deriv_email,
                  deriv_user_id,
                  fullname,
                  deriv_accounts: account_list,
                  is_virtual: account_list[0]?.is_virtual || false,
                  email: session.user.email,
                  updated_at: new Date().toISOString()
                });

              if (profileError) {
                throw profileError;
              }

              // Create initial balance transaction
              await supabase
                .from('transactions')
                .insert({
                  user_id: session.user.id,
                  transaction_type: 'initial_balance',
                  amount: balance,
                  currency: currency,
                  status: 'completed',
                  reference: `Initial balance from Deriv account ${accounts[0].account}`
                });

              toast.success("Successfully connected Deriv account!");
              navigate("/dashboard");
            }
            ws.close();
          };

          ws.onerror = (error) => {
            console.error('WebSocket error:', error);
            toast.error("Failed to connect to Deriv. Please try again.");
            setIsLoading(false);
          };

        } catch (error) {
          console.error('OAuth error:', error);
          toast.error("Failed to connect Deriv account. Please try again.");
          setIsLoading(false);
        }
      }
    };

    handleOAuthRedirect();
  }, [searchParams, navigate, session]);

  const handleDerivConnect = () => {
    if (!session) {
      toast.error("Please sign in first to connect your Deriv account");
      return;
    }
    window.location.href = DERIV_OAUTH_URL;
  };

  return (
    <div className="min-h-screen flex flex-col justify-center bg-gray-50 dark:bg-gray-900 px-6">
      <div className="max-w-md w-full mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-dpesa-dark-gray dark:text-white mb-2">Dpesa</h1>
          <p className="text-gray-600 dark:text-gray-300">
            {!session ? "Welcome! Please sign in or create an account." : "Connect your Deriv account to continue."}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 animate-fade-in">
          {!session ? (
            <Auth
              supabaseClient={supabase}
              appearance={{ 
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: '#ef4444',
                      brandAccent: '#dc2626',
                    },
                  },
                },
              }}
              providers={[]}
              redirectTo="https://dpesa.lovable.app/dashboard"
              localization={{
                variables: {
                  sign_in: {
                    email_label: 'Email',
                    password_label: 'Password',
                  },
                },
              }}
            />
          ) : isLoading ? (
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-300">Connecting your Deriv account...</p>
            </div>
          ) : (
            <button 
              onClick={handleDerivConnect}
              className="w-full px-6 py-3 bg-dpesa-bright-red text-white rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
            >
              Connect Deriv Account
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;