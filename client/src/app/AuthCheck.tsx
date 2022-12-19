import React, { useEffect } from 'react';
import useVerify from '@api/mutation/auth/useVerify';
import { getUser } from '@util/auth/auth';

function AuthCheck() {

  // 액세스 토큰 검증 요청
  const postMutation = useVerify();
  // const postMutation = useMutation(authAPI.postVerify.axios, {
  //   onSuccess: (res: AxiosResponse<typeof authAPI.postVerify.resType>) => {
  //     if (!res.data) return;
  //     dispatch(login(res.data.user));
  //   },
  //   onError: (err: AxiosError<ErrorType>) => {
  //     removeUser();
  //   }
  // });

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