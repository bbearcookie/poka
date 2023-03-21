import React from 'react';
import TitleLabel from '@component/label/titleLabel/TitleLabel';
import Profile from './profile/Index';
import Shipping from './shipping/Index';
import './Index.scss';

interface Props {}

function Index({  }: Props) {
  return (
    <main className="ProfilePage">
      <TitleLabel title="마이페이지" styles={{ marginBottom: "1em" }} />
      <Profile />
      <Shipping />
    </main>
  );
}

export default Index;