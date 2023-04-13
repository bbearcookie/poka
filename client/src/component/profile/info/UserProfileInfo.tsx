import React from 'react';
import UserProfile from '@component/profile/UserProfile';
import { StyledUserProfileInfo } from './_styles';
import { CSSProp } from 'styled-components';

interface Props {
  username: string;
  nickname: string;
  imageName: string;
  cssProp?: CSSProp;
  children?: React.ReactNode;
}

function UserProfileInfo({ username, nickname, imageName, cssProp, children }: Props) {
  return (
    <StyledUserProfileInfo css={{ marginBottom: '5em' }}>
      <UserProfile username={username} nickname={nickname} imageName={imageName} />
      {children}
    </StyledUserProfileInfo>
  );
}

export default UserProfileInfo;
