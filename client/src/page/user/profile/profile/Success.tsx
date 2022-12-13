import React, { useState, useCallback } from 'react';
import * as userAPI from '@api/userAPI';
import { userImage } from '@api/resource';
import UserInfo from './UserInfo';
import UserEditor from './UserEditor';

interface Props {
  user: typeof userAPI.getUserDetail.resType;
}
const DefaultProps = {};

function Success({ user }: Props) {
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
        imageName={userImage(user?.image_name)}
        closeEditor={closeEditor}
      /> :
      <UserInfo
        username={user?.username}
        nickname={user?.nickname}
        imageName={userImage(user?.image_name)}
        startEditor={startEditor}
      />}
    </>
  );
}

export default Success;