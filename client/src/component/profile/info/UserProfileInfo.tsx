import React from 'react';
import UserProfile from '@component/profile/UserProfile';
import { StyledUserProfileInfo } from './_styles';

interface Props {
  username: string;
  nickname: string;
  imageName: string;
  children?: React.ReactNode;
}

function UserProfileInfo({ username, nickname, imageName, children }: Props) {
  return (
    <StyledUserProfileInfo>
      <UserProfile username={username} nickname={nickname} imageName={imageName} />
      {children}
    </StyledUserProfileInfo>
  );
}

export default UserProfileInfo;
