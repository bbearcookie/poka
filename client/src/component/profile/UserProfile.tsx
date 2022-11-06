import React from 'react';
import styled from 'styled-components';
import { BACKEND } from '@util/commonAPI';

interface UserProfileProps {
  nickname?: string;
  username?: string;
  imageName?: string;
  children?: React.ReactNode;
}
const UserProfileDefaultProps = {};

function UserProfile({ nickname, username, imageName, children }: UserProfileProps & typeof UserProfileDefaultProps) {
  return (
    <Profile>
      <img
        width="75"
        height="75"
        src={imageName}
        alt="사용자"
        onError={e => e.currentTarget.src = "/user.png"}
      />
      <UserSection>
        <NicknameLabel>{nickname}</NicknameLabel>
        <UsernameLabel>아이디: <UsernameText>{username}</UsernameText></UsernameLabel>
      </UserSection>
      {children}
    </Profile>
  );
}

UserProfile.defaultProps = UserProfileDefaultProps;
export default UserProfile;

const Profile = styled.section`
  display: flex;
  color: #121828;
  align-items: center;
  flex-wrap: wrap;
  gap: 1em;
`

const UserSection = styled.section`
  flex-grow: 1;
`

const NicknameLabel = styled.p`
  margin: 0 0 0.2em 0;
  font-weight: bold;
  font-size: 1.3rem;
`;

const UsernameLabel = styled.p`
  margin: 0;
`

const UsernameText = styled.span`
  padding: 0 0.4em;
  background-color: #E5E7EB;
  border-radius: 5px;
  word-break: keep-all;
`