import React from 'react';
import Profile from './profile/Index';
import Shipping from './shipping/Index';
import './Index.scss';

interface Props {}
const DefaultProps = {};

function Index({  }: Props) {
  return (
    <div className="ProfilePage">
      <h1 className="title-label">마이페이지</h1>
      <Profile />
      <Shipping />
    </div>
  );
}

export default Index;