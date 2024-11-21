import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { createDerivAPI, DerivAPI } from '@/lib/deriv';
import { toast } from 'sonner';

export const useDerivAPI = () => {
  const [api, setApi] = useState<DerivAPI | null>(null);
  const [isLoading, setIsLoading] = useState(true);
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

        if (!profile) {
          toast.error('Profile not found');
          navigate('/');
          return;
        }

        const derivAPI = createDerivAPI(profile.deriv_token);
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

  return { api, isLoading };
};