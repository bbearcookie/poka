import React from 'react';
import Profile from './profile/Index';
import Shipping from './shipping/Index';
import './Index.scss';

interface IndexProps {
  children?: React.ReactNode;
}
const IndexDefaultProps = {};

function Index({ children }: IndexProps & typeof IndexDefaultProps) {
  return (
    <div className="ProfilePage">
      <h1 className="title-label">마이페이지</h1>
      <Profile />
      <Shipping />
    </div>
  );
}

Index.defaultProps = IndexDefaultProps;
export default Index;