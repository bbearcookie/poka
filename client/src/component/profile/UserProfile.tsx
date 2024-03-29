import React from 'react';
import { userImage } from '@api/resource';
import { StyledUserProfile } from './_styles';

interface Props {
  nickname?: string;
  username?: string;
  imageName?: string;
  children?: React.ReactNode;
}

function UserProfile({ nickname, username, imageName, children }: Props) {
  return (
    <StyledUserProfile>
      <img className="img" alt="프로필" src={userImage(imageName)} />
      <div className="user-section">
        <p className="nickname">
          <b>{nickname}</b>
        </p>
        <p className="username-label">
          아이디: <span className="username">{username}</span>
        </p>
      </div>
      {children}
    </StyledUserProfile>
  );
}

export default UserProfile;
