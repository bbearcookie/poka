import React, { useState, useCallback, useRef } from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { PhotoType } from './Index';

interface UploadProps {
  photoList: PhotoType[];
  setPhotoList: React.Dispatch<React.SetStateAction<PhotoType[]>>;
  children?: React.ReactNode;
}
const UploadDefaultProps = {};

function Upload({ photoList, setPhotoList, children }: UploadProps & typeof UploadDefaultProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const nextId = useRef(0);

  // 포토카드 추가
  const addPhotos = useCallback((photos: PhotoType[]) => {
    setPhotoList(photoList.concat(photos));
  }, [photoList, setPhotoList]);

  // 파일 선택창 보여주기
  const showInput = useCallback(() => { fileRef.current?.click(); }, []);

  // 파일 읽기
  const readFilePromise = useCallback((file: File) => {
    return new Promise<PhotoType>((resolve, reject) => {
      const reader = new FileReader();
      const acceptable = ['image/jpeg', 'image/png']; // 받을 수 있는 파일 타입 지정

      if (acceptable.includes(file.type)) {
        reader.onload = () => {
          resolve({
            idx: nextId.current++,
            name: '',
            imageFile: file,
            previewURL: reader.result
          });
        };
        reader.onerror = reject;
      } else {
        reject('받을 수 없는 타입');
      }

      reader.readAsDataURL(file);
    });
  }, [nextId]);

  // 파일 변경시
  const onChangeFile = useCallback(async (e: React.ChangeEvent) => {
    const files = (e.target as HTMLInputElement).files;
    const newPhotos: PhotoType[] = [];

    if (files) {
      for (let i = 0; i < files.length; i++) {
        try {
          const photo = await readFilePromise(files[i]);
          if (photo) newPhotos.push(photo);
        } catch (err) {
          alert(err);
        }
      }
    }

    addPhotos(newPhotos);
  }, [addPhotos, readFilePromise]);

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
    const newPhotos: PhotoType[] = [];

    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    for (let i = 0; i < files.length; i++) {
      try {
        const photo = await readFilePromise(files[i]);
        if (photo) newPhotos.push(photo);
      } catch (err) {
        alert(err);
      }
    }

    addPhotos(newPhotos);
  }, [addPhotos, readFilePromise]);

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

Upload.defaultProps = UploadDefaultProps;
export default Upload;