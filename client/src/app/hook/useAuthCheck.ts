import { useEffect } from 'react';
import useVerify from '@api/mutation/auth/useVerify';

function useAuthCheck() {
  const mutation = useVerify();

  useEffect(() => {
    mutation.mutate({});
  }, []);

  return mutation;
}

export default useAuthCheck;