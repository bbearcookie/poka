import React, { useEffect } from 'react';
import useVerify from '@api/mutation/auth/useVerify';
import { getUser } from '@util/auth/auth';

function AuthCheck() {

  // 액세스 토큰 검증 요청
  const postMutation = useVerify();

  useEffect(() => {
    const user = getUser();
    if (user) postMutation.mutate({});
  }, []);
  
  return (
    <>
    </>
  );
}

export default AuthCheck;