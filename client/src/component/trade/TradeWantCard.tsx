import React from 'react';
import styled from 'styled-components';
import { Photo } from '@type/photo';
import Card from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardBody from '@component/card/basic/CardBody';
import PhotoCard from '@component/photocard/photo/PhotoCard';

interface Props {
  wantcards: Photo[];
}

function TradeWantCard({ wantcards }: Props) {
  return (
    <Card className="TradeWantCard" styles={{ marginBottom: "5em" }}>
      <CardHeader><h1 className="title">교환 가능한 포토카드</h1></CardHeader>
      <CardBody>
        <PhotoSection>
          {wantcards.map(card => 
          <PhotoCard
            photocardId={card.photocardId}
            key={card.photocardId}
            photoName={card.name}
            memberName={card.memberData.name}
            groupName={card.groupData.name}
            imageName={card.imageName}
          />)}
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
`