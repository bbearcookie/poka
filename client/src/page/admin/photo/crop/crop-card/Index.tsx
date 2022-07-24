import React from 'react';
import Card from '@component/card/basic/Card';
import CardBody from '@component/card/basic/CardBody';
import CardFooter from '@component/card/basic/CardFooter';
import Crop from './Crop';

interface CropCardProps {
  cropper: Cropper;
  cropList: string[];
  setCropList: React.Dispatch<React.SetStateAction<string[]>>;
  children?: React.ReactNode;
}
const CropCardDefaultProps = {};

function CropCard({ cropper, cropList, setCropList, children }: CropCardProps & typeof CropCardDefaultProps) {
  return (
    <Card className="CropCard">
      <CardBody>
        <p className="label">자르기</p>
        <p className="description">선택한 영역의 이미지를 잘라서 추출합니다</p>
      </CardBody>
      <CardFooter>
        <Crop cropper={cropper} cropList={cropList} setCropList={setCropList} />
      </CardFooter>
    </Card>
  );
}

CropCard.defaultProps = CropCardDefaultProps;
export default CropCard;