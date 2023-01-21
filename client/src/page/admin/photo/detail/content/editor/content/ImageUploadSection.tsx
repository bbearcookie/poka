import React, { useCallback } from 'react';
import ImageUploader, { Image } from '@component/form/uploader/ImageUploader';
import { State, Action } from '../reducer';

interface Props {
  state: State;
  dispatch: React.Dispatch<Action>;
}
const DefaultProps = {};

function ImageUploadSection({ state, dispatch }: Props) {
  
  // 이미지 상태 값 변경
  const changeImage = useCallback((img: Image) => {
    dispatch({ type: 'SET_IMAGE', image: img });
    // 업로드 한 이미지가 있다면 오류 메시지 삭제
    if (img.file) dispatch({ type: 'SET_MESSAGE', payload: { target: 'image', value: '' } });
  }, [dispatch]);

  return (
    <section className="image-section">
      <ImageUploader
        value={state.form.image}
        errorMessage={state.message.image}
        description={<p className="description">파일 업로드<br/>Drag & Drop</p>}
        onChange={changeImage}
        styles={{ width: '150px', height: "224px" }}
      />
    </section>
  );
}

export default ImageUploadSection;