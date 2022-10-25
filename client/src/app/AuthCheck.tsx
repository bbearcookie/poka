import React, { useEffect } from 'react';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { useAppDispatch } from '@app/redux/reduxHooks';
import { AxiosError, AxiosResponse } from 'axios';
import { ErrorType } from '@util/commonAPI';
import * as authAPI from '@api/authAPI';
import { login } from '@util/auth/authSlice';
import { getUser, removeUser } from '@util/auth/auth';

function AuthCheck() {
  const dispatch = useAppDispatch();

  // 액세스 토큰 검증 요청
  const postMutation = useMutation(authAPI.postVerify.axios, {
    onSuccess: (res: AxiosResponse<typeof authAPI.postVerify.resType>) => {
      if (!res.data) return;
      dispatch(login(res.data.user));
    },
    onError: (err: AxiosError<ErrorType>) => {
      removeUser();
    }
  });

  useEffect(() => {
    const user = getUser();
    if (user) postMutation.mutate();
  }, []);
  
  return (
    <>
    </>
  );
}

export default AuthCheck;