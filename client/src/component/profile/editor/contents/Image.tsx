import React, { useCallback } from 'react';
import { Image as ImageType } from '@component/form/uploader/ImageUploader';
import ImageUploader from '@component/form/uploader/ImageUploader';
import { State, Action } from '../reducer';

interface Props {
  state: State;
  dispatch: React.Dispatch<Action>;
}

function Image({ state, dispatch }: Props) {
  // 이미지 상태 값 변경
  const changeImage = useCallback(
    (img: ImageType) => {
      if (img.file) dispatch({ type: 'SET_MESSAGE', target: 'image', value: '' }); // 업로드 한 이미지가 있다면 오류 메시지 삭제
      dispatch({ type: 'SET_IMAGE', image: img });
    },
    [dispatch]
  );

  return (
    <aside className="image-section">
      <p className="label">
        <b>이미지</b>
      </p>
      <ImageUploader
        value={state.form.image}
        errorMessage={state.message.image}
        onChange={changeImage}
        styles={{
          width: '5em',
          height: '5em',
          borderRadius: '50%',
        }}
      />
    </aside>
  );
}

export default Image;
