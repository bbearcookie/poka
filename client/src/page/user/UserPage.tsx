import React from 'react';
import UserRouter from '@app/router/UserRouter';
import Sidebar from '@component/sidebar/Sidebar';
import Navbar from '@component/navbar/Navbar';
import '../PageTemplate.scss';

interface UserPageProps {
  children?: React.ReactNode;
}
const UserPageDefaultProps = {};

function UserPage({ children }: UserPageProps & typeof UserPageDefaultProps) {

  return (
    <div className="PageTemplate">
      <Sidebar mode="USER" />
      <section className="page-section">
        <Navbar />
        <UserRouter />
      </section>
    </div>
  );
}

UserPage.defaultProps = UserPageDefaultProps;
export default UserPage;