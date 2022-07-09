import React, { useState, useCallback, useRef } from 'react';
import produce from 'immer';
import classNames from 'classnames';
import Button from '@component/form/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import './ImageUploader.scss';

// 이미지 업로더 컴포넌트 =================
export interface Image {
  file: File | null;
  previewURL: string | ArrayBuffer | null;
  initialURL: string;
}

interface ImageUploaderProps {
  className?: string;
  value: Image;
  message?: string;
  onChange: (img: Image) => void;
  children?: React.ReactNode;
}

const ImageUploaderDefaultProps = {
  message: ''
};

function ImageUploader({ className, value, message, onChange, children }: ImageUploaderProps & typeof ImageUploaderDefaultProps) {
  const [isDragging, setIsDragging] = useState(false);
  const imageRef = useRef<HTMLInputElement>(null);

  // 파일 선택창 보여주기
  const showInput = useCallback(() => { imageRef.current?.click(); }, []);

  // 선택한 이미지 파일 초기화
  const resetImage = useCallback(() => {
    if (imageRef.current) imageRef.current.value = ''; // file 타입의 input 값 초기화

    onChange({
      ...value,
      file: null, // 실제 이미지 파일 초기화
      previewURL: value.initialURL, // 브라우저에 임시로 보여줄 이미지 URL 초기화
    });

  }, [onChange, value]);

  // 선택한 파일로 이미지 변경
  const changeFile = useCallback((file: File | null) => {
    const reader = new FileReader();
    const acceptable = ['image/jpeg', 'image/png']; // 받을 수 있는 파일 타입 지정

    if (!file) return; // 파일이 없으면 처리 안함

    if (acceptable.includes(file.type)) {
      reader.onloadend = () => {
        onChange({
          ...value,
          file: file, // 실제 이미지 파일 설정
          previewURL: reader.result, // 브라우저에 임시로 보여줄 이미지 URL 설정
        });
      };

      reader.readAsDataURL(file);
    } else {
      alert('받을 수 없는 타입');
    }
  }, [onChange, value]);

  // Input 파일 변경시 이미지 변경
  const onChangeInput = useCallback((e: React.ChangeEvent) => {
    const file = (e.target as HTMLInputElement).files?.item(0);
    if (file) changeFile(file);
  }, [changeFile]);

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
  const onDrop = useCallback((e: React.DragEvent) => {
    const file = e.dataTransfer.files.item(0);
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    changeFile(file);
  }, [changeFile]);

  return (
    <article className={classNames("ImageUploader", className)}>
      <input type="file" accept=".jpg, .png" ref={imageRef} onChange={onChangeInput} />

      {value.previewURL &&
      <img
        src={String(value.previewURL)}
        alt="업로드"
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      />}

      {!value.previewURL && 
      <section
        className={classNames("ImageUploader__upload-section", {"isDragging": isDragging})}
        onClick={showInput}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <FontAwesomeIcon icon={faUpload} size="2x" />
        <p className="description">파일을 드래그해서 업로드</p>
      </section>}

      <p className="ImageUploader__message-label">{message}</p>

      <section className="ImageUploader__button-section">
        <Button type="button" theme="primary" padding="0.5em" leftIcon={faUpload} onClick={showInput}>파일 선택</Button>
        <Button type="button" theme="primary-outlined" padding="0.5em" leftIcon={faTrashCan} onClick={resetImage}>초기화</Button>
      </section>

    </article>
  );
}

ImageUploader.defaultProps = ImageUploaderDefaultProps;

export default ImageUploader;