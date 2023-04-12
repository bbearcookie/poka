import { useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { useAppDispatch } from '@app/redux/store';
import { logout } from '@feature/auth/authSlice';
import { logout as logoutFn } from '@api/api/auth';

function useLogout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logoutMutation = useMutation(logoutFn, {
    onSuccess: () => {
      navigate('/login');
      dispatch(logout());
    },
  });

  // 로그아웃 로직
  const handleLogout = useCallback(() => {
    logoutMutation.mutate();
  }, [logoutMutation]);

  return handleLogout;
}

export default useLogout;
