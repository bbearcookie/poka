import React, { useState, useCallback, useRef } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import Button from '@component/form/button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faTrashCan } from '@fortawesome/free-solid-svg-icons';

// 이미지 업로더 컴포넌트 =================
export interface Image {
  file: File | null;
  previewURL: string | ArrayBuffer | null;
  initialURL: string;
}
interface Props {
  className?: string;
  value: Image;
  onChange: (img: Image) => void;
  errorMessage?: string;
  description?: React.ReactNode;
  styles?: StyledImageUploaderProps;
  children?: React.ReactNode;
}
const DefaultProps = {
  errorMessage: '',
};

function ImageUploader({
  className,
  value,
  errorMessage = DefaultProps.errorMessage,
  description,
  onChange,
  styles,
  children,
}: Props) {
  const [isDragging, setIsDragging] = useState(false);
  const imageRef = useRef<HTMLInputElement>(null);

  // 파일 선택창 보여주기
  const showInput = useCallback(() => {
    imageRef.current?.click();
  }, []);

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
  const changeFile = useCallback(
    (file: File) => {
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
        alert('이미지 파일만 업로드할 수 있어요.');
      }
    },
    [onChange, value]
  );

  // Input 파일 변경시 이미지 변경
  const onChangeInput = useCallback(
    (e: React.ChangeEvent) => {
      const file = (e.target as HTMLInputElement).files?.item(0);
      if (file) changeFile(file);
    },
    [changeFile]
  );

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
  const onDrop = useCallback(
    (e: React.DragEvent) => {
      const file = e.dataTransfer.files.item(0);
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      if (file) changeFile(file);
    },
    [changeFile]
  );

  return (
    <article className={classNames('ImageUploader', className)}>
      <input
        type="file"
        accept=".jpg, .png"
        ref={imageRef}
        onChange={onChangeInput}
        style={{ display: 'none' }}
      />

      <StyledImageUploader {...styles}>
        {value.previewURL && (
          <StyledImage
            {...styles}
            src={String(value.previewURL)}
            alt="업로드"
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
          />
        )}

        {!value.previewURL && (
          <UploadSection
            {...styles}
            className={classNames({ isDragging: isDragging })}
            onClick={showInput}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
          >
            <FontAwesomeIcon icon={faUpload} size="2x" />
            {description && description}
          </UploadSection>
        )}
      </StyledImageUploader>

      <ErrorMessageLabel>{errorMessage}</ErrorMessageLabel>

      <ButtonSection>
        <Button
          type="button"
          buttonTheme='primary'
          leftIcon={faUpload}
          iconMargin='1em'
          onClick={showInput}
          css={{
            width: '100%',
            justifyContent: 'center',
            padding: '0.5em 1em',
          }}
        >
          파일 선택
        </Button>
        <Button
          type="button"
          buttonTheme="primary-outlined"
          leftIcon={faTrashCan}
          iconMargin='1em'
          onClick={resetImage}
          css={{
            width: '100%',
            justifyContent: 'center',
            padding: '0.5em 1em',
          }}
        >
          초기화
        </Button>
      </ButtonSection>
    </article>
  );
}

export default ImageUploader;

// 스타일 컴포넌트
interface StyledImageUploaderProps {
  width?: string;
  height?: string;
  borderRadius?: string;
}

const StyledImageUploader = styled.article<StyledImageUploaderProps>`
  margin: 0 auto;
  width: ${p => p.width};
`;

const UploadSection = styled.section<StyledImageUploaderProps>`
  margin-bottom: 1em;
  padding: 1em;
  height: ${p => p.height};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  background-color: #e5e7eb;
  color: #65748b;
  border: 2px dashed #e5e7eb;
  border-radius: ${p => (p.borderRadius ? p.borderRadius : '5px')};
  text-align: center;
  user-select: none;
  cursor: pointer;
  transition: 0.1s all;

  &.isDragging {
    background-color: #bfc1c6;
  }
  &:hover {
    background-color: #dcdee1;
  }
  svg {
    margin-bottom: 0.3em;
  }
`;

const StyledImage = styled.img<StyledImageUploaderProps>`
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  height: ${p => p.height};
  border-radius: ${p => p.borderRadius};
`;

const ButtonSection = styled.section`
  margin-top: 1em;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1em;

  .Button {
    border-radius: 50px;
  }
`;

const ErrorMessageLabel = styled.p`
  margin: 0.5em 0 0.5em 0.8em;
  color: red;
`;
