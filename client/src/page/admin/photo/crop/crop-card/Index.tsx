import React from 'react';
import { Card, CardBody, CardFooter } from '@component/card/basic/_styles';
import Crop from './Crop';

interface Props {
  cropper: Cropper;
  cropList: string[];
  setCropList: React.Dispatch<React.SetStateAction<string[]>>;
}

function CropCard({ cropper, cropList, setCropList }: Props) {
  return (
    <Card className="CropCard">
      <CardBody>
        <h3 className="label">자르기</h3>
        <p className="description">선택한 영역의 이미지를 잘라서 추출합니다</p>
      </CardBody>
      <CardFooter>
        <Crop cropper={cropper} cropList={cropList} setCropList={setCropList} />
      </CardFooter>
    </Card>
  );
}

export default CropCard;