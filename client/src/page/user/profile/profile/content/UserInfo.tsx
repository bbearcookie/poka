import React from 'react';
import UserProfile from '@component/profile/UserProfile';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import Button from '@component/form/Button';
import Card from '@component/card/basic/Card';
import CardBody from '@component/card/basic/CardBody';

interface Props {
  username?: string;
  nickname?: string;
  imageName?: string;
  startEditor: () => void;
}
const DefaultProps = {
  username: '',
  nickname: '',
  imageName: ''
};

function UserInfo({
  username = DefaultProps.username,
  nickname = DefaultProps.nickname,
  imageName = DefaultProps.imageName,
  startEditor
}: Props) {
  return (
    <Card styles={{ marginBottom: "5em" }}>
      <CardBody>
        <UserProfile nickname={nickname} username={username} imageName={imageName}>
          <Button
            rightIcon={faPenToSquare}
            styles={{
              width: "fit-content",
              theme: "primary-outlined",
              padding: "0.7em 1.3em",
              iconMargin: "1em"
            }}
            onClick={startEditor}
          >수정</Button>
        </UserProfile>
      </CardBody>
    </Card>
  );
}

export default UserInfo;