import React from 'react';
import classNames from 'classnames';
import AdminSidebar from '@/component/sidebar/admin/Sidebar';
import './AdminPageTemplate.scss';

type AdminPageTemplateProps = {
  className?: string;
  children?: React.ReactNode;
};

function AdminPageTemplate({ className, children }: AdminPageTemplateProps) {
  return (
    <div className={classNames(className, 'AdminPageTemplate')}>
      <AdminSidebar />
      <section className="page-section">
        {children}
      </section>
    </div>
  );
}

AdminPageTemplate.defaultProps = {

};

export default AdminPageTemplate;