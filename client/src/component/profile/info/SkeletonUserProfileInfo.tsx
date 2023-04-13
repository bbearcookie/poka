import React from 'react';
import { StyledUserProfileInfo } from './_styles';
import SkeletonUserProfile from '../SkeletonUserProfile';

function SkeletonUserProfileInfo() {
  return (
    <StyledUserProfileInfo css={{ marginBottom: '5em' }}>
      <SkeletonUserProfile />
    </StyledUserProfileInfo>
  );
}

export default SkeletonUserProfileInfo;
