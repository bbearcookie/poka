import React from 'react';
import AdminRouter from '@app/router/AdminRouter';
import Sidebar from '@component/sidebar/admin/Sidebar';
import './AdminPage.scss';

type AdminPageProps = {
  children?: React.ReactNode;
};

function AdminPage({ children }: AdminPageProps) {
  return (
    <div className="AdminPage">
      <Sidebar />
      <section className="page-section">
        <AdminRouter />
      </section>
    </div>
  );
}

AdminPage.defaultProps = {

};

export default AdminPage;