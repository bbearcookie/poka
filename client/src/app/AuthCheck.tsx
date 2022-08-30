import React, { useEffect } from 'react';
import { useAppDispatch } from './reduxHooks';
import { login } from '@util/auth/authSlice';
import { getUser } from '@util/auth/auth';

function AuthCheck() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const user = getUser();
    if (user) dispatch(login(user));
  }, [dispatch]);
  
  return (
    <>
    </>
  );
}

export default AuthCheck;