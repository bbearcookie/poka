import React, { useState, useCallback } from 'react';
import { ResType as UserResType } from '@api/query/user/useUserQuery';
import { userImage } from '@api/resource';
import UserInfo from './content/UserInfo';
import UserEditor from './content/editor/UserEditor';

interface Props {
  user: UserResType;
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
        userId={user.userId}
        nickname={user.nickname}
        imageName={userImage(user.imageName)}
        closeEditor={closeEditor}
      /> :
      <UserInfo
        username={user.username}
        nickname={user.nickname}
        imageName={user.imageName}
        startEditor={startEditor}
      />}
    </>
  );
}

export default Success;