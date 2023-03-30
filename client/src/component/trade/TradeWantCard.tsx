import React from 'react';
import styled from 'styled-components';
import { Photo } from '@type/photo';
import Card from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardBody from '@component/card/basic/CardBody';
import PhotocardItem from '@component/photocard/item/PhotocardItem';

interface Props {
  wantcards: Photo[];
}

function TradeWantCard({ wantcards }: Props) {
  return (
    <Card className="TradeWantCard" styles={{ marginBottom: '5em' }}>
      <CardHeader>
        <h1 className="title">교환 가능한 포토카드</h1>
      </CardHeader>
      <CardBody>
        <PhotoSection>
          {wantcards.map((card) => (
            <PhotocardItem {...card} key={card.photocardId} />
          ))}
        </PhotoSection>
      </CardBody>
    </Card>
  );
}

export default TradeWantCard;

const PhotoSection = styled.section`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1em;
`;
