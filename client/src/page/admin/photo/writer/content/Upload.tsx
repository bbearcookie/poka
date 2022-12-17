import React, { useState, useCallback, useRef } from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { State, Action } from '../reducer';

interface Props {
  state: State;
  dispatch: React.Dispatch<Action>;
}
const DefaultProps = {};

function Upload({ state, dispatch }: Props) {
  const [isDragging, setIsDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const nextId = useRef(0);

  // 파일 선택창 보여주기
  const showInput = useCallback(() => { fileRef.current?.click(); }, []);

  // 파일 읽어서 포토카드에 추가
  const addPhotos = useCallback(async (files: FileList | null) => {
    if (!files) return;
    const acceptable = ['image/jpeg', 'image/png']; // 받을 수 있는 파일 타입 지정
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      if (acceptable.includes(file.type)) {
        reader.onload = () => {
          dispatch({
            type: 'ADD_PHOTO',
            payload: {
              idx: nextId.current++,
              name: '',
              message: '',
              imageFile: file,
              previewURL: reader.result
            }
          });
        }
        reader.readAsDataURL(file);
      } else {
        alert('받을 수 없는 타입');
      }
    }
  }, [dispatch]);

  // 파일 변경시
  const onChangeFile = useCallback(async (e: React.ChangeEvent) => {
    const files = (e.target as HTMLInputElement).files;
    addPhotos(files);
  }, [addPhotos]);

  // 파일로 드래그 하면 드래그 모드 ON (스타일 적용)
  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files) setIsDragging(true);
  }, []);

  // 드래그 중 영역 벗어나면 드래그 모드 OFF (스타일 해제)
  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  // 파일 드롭하면 이미지 변경
  const onDrop = useCallback(async (e: React.DragEvent) => {
    const files = e.dataTransfer.files;
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    addPhotos(files);
  }, [addPhotos]);

  return (
    <div
      className={classNames("Upload", {"isDragging": isDragging})}
      onClick={showInput}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <input type="file" accept=".jpg, .png" multiple ref={fileRef} onChange={onChangeFile} />
      <FontAwesomeIcon icon={faUpload} size="2x" />
      <p className="description">파일 업로드</p>
      <p className="description">Drag & Drop</p>
    </div>
  );
}

export default Upload;