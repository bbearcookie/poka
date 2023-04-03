import React, { Fragment } from 'react';
import { Card, CardHeader, CardBody } from '@component/card/basic/_styles';

interface Props {
  cropList: string[];
}

function CropList({ cropList }: Props) {
  return (
    <Card className="CropList">
      <CardHeader>
        <h2 className="title">부분 이미지 목록</h2>
      </CardHeader>
      <CardBody>
        {cropList.map((item, idx) => (
          <Fragment key={idx}>
            <img src={item} alt='크롭된 이미지' />
          </Fragment>
        ))}
      </CardBody>
    </Card>
  );
}

export default CropList;