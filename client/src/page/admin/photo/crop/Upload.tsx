import React, { useState, useCallback, useRef } from 'react';
import Cropper from 'react-cropper';
import { Card, CardHeader, CardBody } from '@component/card/basic/_styles';
import TitleLabel from '@component/label/TitleLabel';
import Button from '@component/form/button/Button';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import 'cropperjs/dist/cropper.css';

interface Props {
  setCropper: React.Dispatch<React.SetStateAction<Cropper | undefined>>;
}

function Upload({ setCropper }: Props) {
  const [image, setImage] = useState<string | ArrayBuffer | null>();
  const fileRef = useRef<HTMLInputElement>(null);

  // 파일 선택창 보여주기
  const showInput = useCallback(() => {
    fileRef.current?.click();
  }, []);

  // 선택한 파일로 이미지 변경
  const changeFile = useCallback((file: File | null) => {
    const reader = new FileReader();
    const acceptable = ['image/jpeg', 'image/png']; // 받을 수 있는 파일 타입 지정

    if (!file) return; // 파일이 없으면 처리 안함

    if (acceptable.includes(file.type)) {
      reader.onloadend = () => {
        setImage(reader.result);
      };

      reader.readAsDataURL(file);
    } else {
      alert('받을 수 없는 타입');
    }
  }, []);

  // Input 파일 변경시 이미지 변경
  const onChangeImageInput = useCallback(
    (e: React.ChangeEvent) => {
      const file = (e.target as HTMLInputElement).files?.item(0);
      if (file) changeFile(file);
    },
    [changeFile]
  );

  return (
    <Card css={{ marginBottom: '2em' }}>
      <CardHeader>
        <TitleLabel title="이미지 자르기">
          <input
            type="file"
            accept=".jpg, .png"
            onChange={onChangeImageInput}
            ref={fileRef}
            css={{ display: 'none' }}
          />
          <Button
            buttonTheme="primary"
            iconMargin="1em"
            leftIcon={faUpload}
            onClick={showInput}
            css={{
              padding: '0.75em 1em',
            }}
          >
            파일 선택
          </Button>
        </TitleLabel>
      </CardHeader>
      <CardBody>
        <Cropper
          css={{ maxHeight: '40em' }}
          zoomTo={0.5}
          initialAspectRatio={1}
          preview=".img-preview"
          src={String(image)}
          dragMode="move"
          viewMode={1}
          minCropBoxHeight={10}
          minCropBoxWidth={10}
          background={false}
          responsive={true}
          autoCropArea={1}
          checkOrientation={false}
          onInitialized={instance => {
            setCropper(instance);
          }}
          guides={true}
        />
        <p className="description">원본 이미지에서 포토카드 부분만 추출하기 위한 기능입니다.</p>
        <br />
        <p className="description">이동 W,A,S,D</p>
        <p className="description">자르기 .</p>
      </CardBody>
    </Card>
  );
}

export default Upload;
