import React from 'react';
import { StyledUserProfileInfo } from './_styles';
import SkeletonUserProfile from '../SkeletonUserProfile';

function SkeletonUserProfileInfo() {
  return (
    <StyledUserProfileInfo>
      <SkeletonUserProfile />
    </StyledUserProfileInfo>
  );
}

export default SkeletonUserProfileInfo;