import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '@component/sidebar/admin/Sidebar';
import './AdminPage.scss';
import AdminRouter from '@app/router/AdminRouter';

type AdminPageProps = {
  children?: React.ReactNode;
};

function AdminPage({ children }: AdminPageProps) {
  return (
    <div className="AdminPage">
      <Sidebar />
      <section className="page-section">
        <div><Link to="">index로</Link></div>
        <div><Link to="first">first로</Link></div>
        <div><Link to="second">second로</Link></div>
        <AdminRouter />
      </section>
    </div>
  );
}

AdminPage.defaultProps = {

};

export default AdminPage;