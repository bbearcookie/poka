import React from 'react';
import { useAppSelector, useAppDispatch } from '@app/reduxHooks';
import Sidebar from '@component/sidebar/Sidebar';
import Navbar from '@component/navbar/Navbar';
import '../PageTemplate.scss';

interface UserPageProps {
  children?: React.ReactNode;
}
const UserPageDefaultProps = {};

function UserPage({ children }: UserPageProps & typeof UserPageDefaultProps) {
  const { username, strategy, role } = useAppSelector((state) => state.auth);

  return (
    <div className="PageTemplate">
      <Sidebar mode="USER" />
      <section className="page-section">
        <Navbar />
        <div>유저 페이지</div>
        <div>{username}</div>
        <div>{strategy}</div>
        <div>{role}</div>
      </section>
    </div>
  );
}

UserPage.defaultProps = UserPageDefaultProps;
export default UserPage;