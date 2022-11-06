import React, { useState, useCallback } from 'react';
import * as userAPI from '@api/userAPI';
import { BACKEND } from '@util/commonAPI';
import UserInfo from './user/UserInfo';
import UserEditor from './user/UserEditor';

interface SuccessProps {
  user: typeof userAPI.getUserDetail.resType;
  children?: React.ReactNode;
}
const SuccessDefaultProps = {};

function Success({ user, children }: SuccessProps & typeof SuccessDefaultProps) {
  const [editMode, setEditMode] = useState(false);

  // 편집 모드 ON / OFF
  const startEditor = useCallback(() => setEditMode(true), []);
  const closeEditor = useCallback(() => setEditMode(false), []);

  return (
    <>
      {editMode ?
      <UserEditor
        userId={user?.user_id}
        nickname={user?.nickname}
        imageName={`${BACKEND}/image/user/${user?.image_name}`}
        closeEditor={closeEditor}
      /> :
      <UserInfo
        username={user?.username}
        nickname={user?.nickname}
        imageName={`${BACKEND}/image/user/${user?.image_name}`}
        startEditor={startEditor}
      />}
    </>
  );
}

Success.defaultProps = SuccessDefaultProps;
export default Success;