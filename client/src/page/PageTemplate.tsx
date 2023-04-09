import React from 'react';
import AdminRouter from '@route/AdminRouter';
import UserRouter from '@route/UserRouter';
import Sidebar from '@component/sidebar/Sidebar';
import Navbar from '@component/navbar/Navbar';
import './PageTemplate.scss';

interface Props {
  pageType: 'USER' | 'ADMIN';
}

function PageTemplate({ pageType }: Props) {
  return (
    <div className="PageTemplate">
      {pageType === 'ADMIN' && <Sidebar mode="ADMIN" />}
      {pageType === 'USER' && <Sidebar mode="USER" />}
      
      <main className="page-section">
        <Navbar />
        {pageType === 'ADMIN' && <AdminRouter />}
        {pageType === 'USER' && <UserRouter />}
      </main>
    </div>
  );
}

export default PageTemplate;