import React from 'react';
import TitleLabel from '@component/label/titleLabel/TitleLabel';
import { StyledIndex } from './_styles';

function Index() {
  return (
    <StyledIndex>
      <TitleLabel title="내가 등록한 교환" styles={{ marginBottom: '2em' }} />
    </StyledIndex>
  );
}

export default Index;
