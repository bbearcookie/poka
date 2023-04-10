import React from 'react';
import AdminRouter from '@route/AdminRouter';
import UserRouter from '@route/UserRouter';
import NewSidebar from '@feature/sidebar/Sidebar';
import Sidebar from '@component/sidebar/Sidebar';
import Navbar from '@component/navbar/Navbar';
import { StyledPageTemplate } from './PageTemplate.style';

interface Props {
  pageType: 'USER' | 'ADMIN';
}

function PageTemplate({ pageType }: Props) {
  return (
    <StyledPageTemplate>

      {pageType === 'ADMIN' && <NewSidebar barType="ADMIN" />}
      {pageType === 'USER' && <NewSidebar barType="USER" />}
      
      <main className="page-section">
        <Navbar />
        {pageType === 'ADMIN' && <AdminRouter />}
        {pageType === 'USER' && <UserRouter />}
      </main>
    </StyledPageTemplate>
  );
}

export default PageTemplate;