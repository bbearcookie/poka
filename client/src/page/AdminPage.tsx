import React from 'react';
import AdminPageTemplate from '@template/AdminPageTemplate';

type AdminPageProps = {
  children?: React.ReactNode;
};

function AdminPage({ children }: AdminPageProps) {
  return (
    <AdminPageTemplate className='AdminPage'>
      <div>ㅎㅇ</div>
      <div>ㅎㅇ</div>
      {Array.from({length: 150}).map((_, idx) => (<div key={idx}>길이가 무지막지길다면</div>))}
    </AdminPageTemplate>
  );
}

AdminPage.defaultProps = {

};

export default AdminPage;