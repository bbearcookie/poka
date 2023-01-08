import React from 'react';
import Card from '@component/card/basic/Card';
import CardBody from '@component/card/basic/CardBody';
import { Body, ContentSection } from '@component/trade/TradeCard';
import SkeletonItem from '@component/skeleton/SkeletonItem';

interface Props {

}
const DefaultProps = {};

function SkeletonTradeCard({  }: Props) {
  return (
    <Card
      styles={{
        width: "100%",
        boxShadow: "1px 1px 5px 0px #C0C0C0"
      }}
    >
      <CardBody>
        <Body>
          <SkeletonItem styles={{ width: "200px", height: "224px" }} />
          <ContentSection>
            <SkeletonItem styles={{ width: "15rem", height: "1.6rem", marginBottom: "0.4em" }} />
            <SkeletonItem styles={{ width: "7rem", height: "1.6rem", marginBottom: "0.4em" }} />
            <SkeletonItem styles={{ width: "5rem", height: "1.6rem", marginBottom: "0.4em" }} />
          </ContentSection>
        </Body>
      </CardBody>
    </Card>
  );
}

export default SkeletonTradeCard;