import React from 'react';
import { useAppSelector } from '@app/redux/reduxHooks';
import Profile from './profile/Index';
import Shipping from './shipping/Index';
import './Index.scss';

interface IndexProps {
  children?: React.ReactNode;
}
const IndexDefaultProps = {};

function Index({ children }: IndexProps & typeof IndexDefaultProps) {
  const userId = useAppSelector(state => state.auth.user_id);
  
  return (
    <div className="ProfilePage">
      <h1 className="title-label">마이페이지</h1>
      <Profile userId={userId} />
      <Shipping userId={userId} />
    </div>
  );
}

Index.defaultProps = IndexDefaultProps;
export default Index;