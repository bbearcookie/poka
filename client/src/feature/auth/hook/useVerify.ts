import { useCallback } from 'react';
import { useAppDispatch } from '@app/redux/store';
import { useMutation } from '@tanstack/react-query';
import { verify as verifyFn } from '@api/api/auth';
import { login, logout } from '@feature/auth/authSlice';

function useVerify() {
  const dispatch = useAppDispatch();

  const logoutMutation = useMutation(verifyFn, {
    onSuccess: res => dispatch(login(res.data.user)),
    onError: () => dispatch(logout()),
  });

  // 로그인 토큰 검증 로직
  const handleVerify = useCallback(() => {
    logoutMutation.mutate();
  }, [logoutMutation]);

  return handleVerify;
}

export default useVerify;
