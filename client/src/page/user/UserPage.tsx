import React from 'react';
import '../PageTemplate.scss';

interface UserPageProps {
  children?: React.ReactNode;
}
const UserPageDefaultProps = {};

function UserPage({ children }: UserPageProps & typeof UserPageDefaultProps) {
  return (
    <div className="PageTemplate">
      유저 페이지
    </div>
  );
}

UserPage.defaultProps = UserPageDefaultProps;
export default UserPage;