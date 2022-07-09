import React from 'react';
import AdminRouter from '@app/router/AdminRouter';
import Sidebar from '@component/sidebar/admin/Sidebar';
import Navbar from '@component/navbar/admin/Navbar';
import './AdminPage.scss';

interface AdminPageProps {
  children?: React.ReactNode;
}

const AdminPageDefaultProps = {};

function AdminPage({ children }: AdminPageProps & typeof AdminPageDefaultProps) {
  return (
    <div className="AdminPage">
      <Sidebar />
      <section className="page-section">
        <Navbar />
        <AdminRouter />
      </section>
    </div>
  );
}

AdminPage.defaultProps = AdminPageDefaultProps;

export default AdminPage;