import React, { useCallback } from 'react';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import TitleLabel from '@component/label/titleLabel/TitleLabel';
import Card from '@component/card/basic/Card';
import CardBody from '@component/card/basic/CardBody';
import PhotoListWithFilter from '@component/list/PhotoListWithFilter';
import './Index.scss';

interface Props {}

function Index({  }: Props) {

  const onTest = useCallback((photocardId: number) => {
    console.log(photocardId);
  }, []);

  return (
    <div className="AdminShippingListPage">
      <TitleLabel title="배송요청 목록" styles={{ marginBottom: "1em" }} />
      <Card>
        <CardBody>
          <PhotoListWithFilter icon={{ svg: faArrowRight }} handleSelect={onTest} />
        </CardBody>
      </Card>
    </div>
  );
}

export default Index;