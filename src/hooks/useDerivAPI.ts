import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { createDerivAPI, DerivAPI } from '@/lib/deriv';
import { toast } from 'sonner';

export const useDerivAPI = () => {
  const [api, setApi] = useState<DerivAPI | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [balance, setBalance] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const initAPI = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          navigate('/');
          return;
        }

        const { data: profile } = await supabase
          .from('profiles')
          .select('deriv_token')
          .eq('id', session.user.id)
          .single();

        if (!profile?.deriv_token) {
          toast.error('Deriv account not connected');
          navigate('/');
          return;
        }

        const derivAPI = createDerivAPI(profile.deriv_token);
        
        // Set up real-time balance updates
        derivAPI.setBalanceUpdateHandler((newBalance) => {
          setBalance(newBalance);
        });

        // Get initial account info
        const accountInfo = await derivAPI.getAccountInfo();
        
        // Update profile with latest Deriv info
        await supabase
          .from('profiles')
          .update({
            deriv_accounts: accountInfo.account_list,
            deriv_email: accountInfo.email,
            fullname: accountInfo.fullname,
            updated_at: new Date().toISOString()
          })
          .eq('id', session.user.id);

        setBalance(accountInfo.balance);
        setApi(derivAPI);
      } catch (error) {
        console.error('Failed to initialize Deriv API:', error);
        toast.error('Failed to connect to Deriv');
      } finally {
        setIsLoading(false);
      }
    };

    initAPI();

    return () => {
      if (api) {
        api.disconnect();
      }
    };
  }, [navigate]);

  return { api, isLoading, balance };
};