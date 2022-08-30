import React from 'react';
import { useAppSelector, useAppDispatch } from '@app/reduxHooks';
import { login, logout } from '@util/auth/authSlice';
import '../PageTemplate.scss';

interface UserPageProps {
  children?: React.ReactNode;
}
const UserPageDefaultProps = {};

function UserPage({ children }: UserPageProps & typeof UserPageDefaultProps) {
  const { username, strategy, role } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  return (
    <div className="PageTemplate">
      <div>유저 페이지</div>
      <div>{username}</div>
      <div>{strategy}</div>
      <div>{role}</div>
    </div>
  );
}

UserPage.defaultProps = UserPageDefaultProps;
export default UserPage;