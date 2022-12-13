import React from 'react';
import UserRouter from '@app/router/UserRouter';
import Sidebar from '@component/sidebar/Sidebar';
import Navbar from '@component/navbar/Navbar';
import '../PageTemplate.scss';

interface Props {}
const UserPageDefaultProps = {};

function UserPage({  }: Props) {
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

export default UserPage;