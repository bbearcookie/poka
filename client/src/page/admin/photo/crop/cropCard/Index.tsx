import React from 'react';
import TitleLabel from '@component/label/TitleLabel';
import { Card, CardHeader, CardBody, CardFooter } from '@component/card/basic/_styles';
import Crop from './Crop';

interface Props {
  cropper: Cropper;
  cropList: string[];
  setCropList: React.Dispatch<React.SetStateAction<string[]>>;
}

function CropCard({ cropper, cropList, setCropList }: Props) {
  return (
    <Card>
      <CardHeader>
        <TitleLabel title="자르기" />
      </CardHeader>
      <CardBody>
        <p className="description">선택한 영역의 이미지를 잘라서 추출합니다</p>
      </CardBody>
      <CardFooter css={{ display: 'flex', flexWrap: 'wrap', gap: '1em' }}>
        <Crop cropper={cropper} cropList={cropList} setCropList={setCropList} />
      </CardFooter>
    </Card>
  );
}

export default CropCard;
