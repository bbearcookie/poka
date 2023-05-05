import { useCallback } from 'react';
import { useAppDispatch } from '@app/redux/store';
import { useMutation } from '@tanstack/react-query';
import { verify as verifyFn } from '@api/api/auth';
import { saveUserToStorage, removeUserFromStorage } from '../authStorage';
import { login, logout } from '@feature/auth/authSlice';

export default function useVerify() {
  const dispatch = useAppDispatch();

  const logoutMutation = useMutation({
    mutationFn: verifyFn,
    onSuccess: res => {
      dispatch(login(res.data.user));
      saveUserToStorage(res.data.user);
    },
    onError: () => {
      dispatch(logout());
      removeUserFromStorage();
    },
  });

  return useCallback(() => {
    logoutMutation.mutate();
  }, [logoutMutation]);
}
