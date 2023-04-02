import React from 'react';
import TitleLabel from '@component/label/titleLabel/TitleLabel';
import Profile from './profile/Index';
import Shipping from './shipping/Index';
import { StyledIndex } from './_styles';

function Index() {
  return (
    <StyledIndex className="ProfilePage">
      <TitleLabel title="마이페이지" styles={{ marginBottom: "1em" }} />
      <Profile />
      <Shipping />
    </StyledIndex>
  );
}

export default Index;