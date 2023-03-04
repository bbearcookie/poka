import React, { useCallback, useReducer } from 'react';
import TitleLabel from '@component/label/titleLabel/TitleLabel';
import Card from '@component/card/basic/Card';
import CardBody from '@component/card/basic/CardBody';
import PhotoListCard from '@component/list/new/photo/PhotoListCard';
import './Index.scss';

interface Props {}

function Index({  }: Props) {
  return (
    <div className="AdminShippingListPage">
      <TitleLabel title="배송요청 목록" styles={{ marginBottom: "1em" }} />
      <Card>
        <CardBody>
          <PhotoListCard />
        </CardBody>
      </Card>
    </div>
  );
}

export default Index;