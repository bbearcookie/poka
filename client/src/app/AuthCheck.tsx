import React, { useEffect } from 'react';
import useVerify from '@api/mutation/auth/useVerify';
import { getUser } from '@util/auth/auth';

// 로그인 확인
function AuthCheck() {
  const postMutation = useVerify();

  useEffect(() => {
    const user = getUser();
    if (user) postMutation.mutate({});
  }, []);
  
  return <></>;
}

export default AuthCheck;