import React from 'react';
import styled from 'styled-components';
import { WantcardType } from '@type/trade';
import Card from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardBody from '@component/card/basic/CardBody';
import PhotoInfoCard from '@component/photocard/photo/PhotoInfoCard';

interface Props {
  wantcards: WantcardType[];
}
const DefaultProps = {};

function TradeWantCard({ wantcards }: Props) {
  return (
    <Card className="TradeWantCard" styles={{ marginBottom: "5em" }}>
      <CardHeader><h1 className="title">교환 가능한 포토카드</h1></CardHeader>
      <CardBody>
        <PhotoSection>
          {wantcards.map(card => 
          <PhotoInfoCard
            key={card.photocard_id}
            photoName={card.photo_name}
            memberName={card.member_name}
            groupName={card.group_name}
            imageName={card.image_name}
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