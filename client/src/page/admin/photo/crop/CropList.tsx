import React, { Fragment } from 'react';
import Card from '@component/card/basic/Card';
import { CardHeader, CardBody } from '@component/card/basic/_styles';

interface Props {
  cropList: string[];
}

function CropList({ cropList }: Props) {
  return (
    <Card styles={{ marginTop: "2em" }}>
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