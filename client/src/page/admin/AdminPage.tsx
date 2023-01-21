import React from 'react';
import AdminRouter from '@app/router/AdminRouter';
import Sidebar from '@component/sidebar/Sidebar';
import Navbar from '@component/navbar/Navbar';
import '../PageTemplate.scss';

interface Props {}
const DefaultProps = {};

function AdminPage({  }: Props) {
  return (
    <div className="PageTemplate">
      <Sidebar mode="ADMIN" />
      <section className="page-section">
        <Navbar />
        <AdminRouter />
      </section>
    </div>
  );
}

export default AdminPage;