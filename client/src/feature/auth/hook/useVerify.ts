import { useCallback } from 'react';
import { useAppDispatch } from '@app/redux/store';
import { useMutation } from '@tanstack/react-query';
import { verify as verifyFn } from '@api/api/auth';
import { login, logout } from '@feature/auth/authSlice';

export default function useVerify() {
  const dispatch = useAppDispatch();

  const logoutMutation = useMutation(verifyFn, {
    onSuccess: res => dispatch(login(res.data.user)),
    onError: () => dispatch(logout()),
  });

  return useCallback(() => {
    logoutMutation.mutate();
  }, [logoutMutation]);
}
