import { useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { useAppDispatch } from '@app/redux/store';
import { logout } from '@feature/auth/authSlice';
import { logout as logoutFn } from '@api/api/auth';
import { removeUserFromStorage } from '../authStorage';

export default function useLogout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logoutMutation = useMutation(logoutFn, {
    onSuccess: () => {
      dispatch(logout());
      removeUserFromStorage();
      navigate('/login');
    },
  });

  return useCallback(() => {
    logoutMutation.mutate();
  }, [logoutMutation]);
}
