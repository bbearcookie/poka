import React, { useState, useCallback, useRef } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import Button from '@component/form/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faTrashCan } from '@fortawesome/free-solid-svg-icons';

// 이미지 업로더 컴포넌트 =================
const CLASS = "ImageUploader";
export interface Image {
  file: File | null;
  previewURL: string | ArrayBuffer | null;
  initialURL: string;
}
interface ImageUploaderProps {
  value: Image;
  onChange: (img: Image) => void;
  className?: string;
  message?: string;
  styles?: StyledImageUploaderProps;
  imageStyles?: ImageStylesProps;
  children?: React.ReactNode;
}
const ImageUploaderDefaultProps = {
  message: ''
};

function ImageUploader({ className, value, message, onChange, styles, imageStyles, children }: ImageUploaderProps & typeof ImageUploaderDefaultProps) {
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
  const changeFile = useCallback((file: File) => {
    const reader = new FileReader();
    const acceptable = ['image/jpeg', 'image/png']; // 받을 수 있는 파일 타입 지정

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
    if (file) changeFile(file);
  }, [changeFile]);

  return (
    <StyledImageUploader
      {...StyledImageUploaderDefaultProps} {...styles}
      className={classNames(CLASS, className)}
    >
      <input type="file" accept=".jpg, .png" ref={imageRef} onChange={onChangeInput} style={{ display: "none" }} />

      <section className={`${CLASS}__content-section`}>
        {value.previewURL &&
        <StyledImage
          {...ImageStylesDefaultProps} {...imageStyles}
          src={String(value.previewURL)}
          alt="업로드"
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
        />}

        {!value.previewURL &&
        <section
          className={classNames(`${CLASS}__upload-section`, {"isDragging": isDragging})}
          onClick={showInput}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
        >
          <FontAwesomeIcon icon={faUpload} size="2x" />
          <p className="description">파일 업로드</p>
          <p className="description">Drag & Drop</p>
        </section>}
      </section>

      <p className={`${CLASS}__message-label`}>{message}</p>

      <section className={`${CLASS}__button-section`}>
        <Button
          type="button"
          leftIcon={faUpload}
          onClick={showInput}
          styles={{
            theme: "primary",
            padding: "0.5em"
          }}
        >파일 선택</Button>
        <Button
          type="button"
          leftIcon={faTrashCan}
          onClick={resetImage}
          styles={{
            theme: "primary-outlined",
            padding: "0.5em"
          }}
        >초기화</Button>
      </section>

    </StyledImageUploader>
  );
}

ImageUploader.defaultProps = ImageUploaderDefaultProps;
export default ImageUploader;

// 스타일 컴포넌트
interface StyledImageUploaderProps {
  width?: string;
  height?: string;
}
const StyledImageUploaderDefaultProps = {};
const StyledImageUploader = styled.article<StyledImageUploaderProps & typeof StyledImageUploaderDefaultProps>`
  width: ${p => p.width};

  .${CLASS}__upload-section {
    margin-bottom: 1em; padding: 1em;
    width: ${p => p.width};
    height: ${p => p.height};
    min-height: 10rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    background-color: #E5E7EB;
    color: #65748B;
    border: 2px dashed #E5E7EB;
    border-radius: 5px;
    text-align: center;
    user-select: none;
    cursor: pointer;
    transition: 0.1s all;

    &.isDragging { background-color: #bfc1c6; }
    &:hover { background-color: #dcdee1; }
    svg { margin-bottom: 0.3em; }
  }

  .${CLASS}__message-label {
    margin: 0.5em 0 0.5em 0.8em;
    color: red;
  }

  .${CLASS}__button-section {
    margin-top: 1em;
    
    .Button {
      width: 100%;
      border-radius: 50px;
      margin-bottom: 1em;
    }
  }
`;

interface ImageStylesProps {
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  height?: string;
}
const ImageStylesDefaultProps = {}
const StyledImage = styled.img<ImageStylesProps & typeof ImageStylesDefaultProps>`
  margin-left: auto;
  margin-right: auto;
  width: ${p => p.width};
  max-width: ${p => p.maxWidth};
  min-width: ${p => p.minWidth};
  height: ${p => p.height};
`;