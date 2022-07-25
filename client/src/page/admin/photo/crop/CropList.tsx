import React, { Fragment } from 'react';
import Card from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardBody from '@component/card/basic/CardBody';
import CardFooter from '@component/card/basic/CardFooter';

interface CropListProps {
  cropList: string[];
  children?: React.ReactNode;
}
const CropListDefaultProps = {};

function CropList({ cropList, children }: CropListProps & typeof CropListDefaultProps) {
  return (
    <Card marginTop="2em">
      <CardHeader>
        <section className="title-section">
          <h1 className="title-label">부분 이미지 목록</h1>
        </section>
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

CropList.defaultProps = CropListDefaultProps;
export default CropList;