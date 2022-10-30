import React from 'react';
import UserProfile from '@component/profile/UserProfile';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import Button from '@component/form/Button';
import Card from '@component/card/basic/Card';
import CardBody from '@component/card/basic/CardBody';

interface UserInfoProps {
  startEditor: () => void;
  children?: React.ReactNode;
}
const UserInfoDefaultProps = {};

function UserInfo({ startEditor, children }: UserInfoProps & typeof UserInfoDefaultProps) {
  return (
    <Card marginBottom="5em">
      <CardBody>
        <UserProfile nickname="닉네임" username="아이디">
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

UserInfo.defaultProps = UserInfoDefaultProps;
export default UserInfo;