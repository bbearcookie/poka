import produce from 'immer';
import { useState, useReducer, useCallback } from 'react';
import { ResType } from '@api/query/user/useUserQuery';
import useModifyUserProfile from '@api/mutation/user/useModifyUserProfile';
import { userImage } from '@api/resource';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import Button from '@component/form/Button';
import UserProfileEditor from '@component/profile/editor/UserProfileEditor';
import UserProfileInfo from '@component/profile/info/UserProfileInfo';
import { reducer, initialState, FormType } from '@component/profile/editor/reducer';

interface Props {
  res: ResType;
}

function Success({ res }: Props) {
  // 수정 모드 입력 데이터
  const [state, dispatch] = useReducer(
    reducer,
    produce(initialState, draft => {
      draft.form.nickname = res.nickname;
      draft.form.image = {
        file: null,
        previewURL: userImage(res.imageName),
        initialURL: userImage(res.imageName),
      };
    })
  );

  // 데이터 수정 요청
  const putMutation = useModifyUserProfile<keyof FormType>(
    res.userId,
    res => closeEditor(),
    err => {
      err.response?.data.errors.forEach(e => {
        dispatch({ type: 'SET_MESSAGE', target: e.param, value: e.message });
      });
    }
  );

  // 편집 모드 ON / OFF
  const [editMode, setEditMode] = useState(false);
  const startEditor = useCallback(() => setEditMode(true), []);
  const closeEditor = useCallback(() => setEditMode(false), []);

  // 전송 이벤트
  const handleSubmit = useCallback(() => {
    putMutation.mutate({
      nickname: state.form.nickname,
      image: state.form.image.file,
    });
  }, [state, putMutation]);

  // 수정 모드 출력
  if (editMode)
    return (
      <UserProfileEditor
        state={state}
        dispatch={dispatch}
        handleCancel={closeEditor}
        handleSubmit={handleSubmit}
      />
    );
  // 읽기 모드 출력
  else
    return (
      <UserProfileInfo {...res}>
        <Button
          rightIcon={faPenToSquare}
          styles={{
            width: 'fit-content',
            height: '3em',
            theme: 'primary-outlined',
            padding: '0.7em 1.3em',
            iconMargin: '1em',
          }}
          onClick={startEditor}
        >
          수정
        </Button>
      </UserProfileInfo>
    );
}

export default Success;