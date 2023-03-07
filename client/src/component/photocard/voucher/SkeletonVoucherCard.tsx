import React from 'react';
import { PhotoName, ContentSection, NameSection } from '../PhotoCardTemplate';
import Card from '@component/card/basic/Card';
import CardBody from '@component/card/basic/CardBody';
import CardFooter from '@component/card/basic/CardFooter';
import SkeletonItem from '@component/skeleton/SkeletonItem';
import { StylesProps } from '@component/card/basic/Card';

interface Props {
  cardStyles?: StylesProps;
}

function SkeletonVoucherCard({ cardStyles }: Props) {
  return (
    <Card
      className="PhotoCard"
      styles={{
        width: "calc(150px + 3em)",
        boxShadow: "0px 0px 10px 0px #C0C0C0",
        ...cardStyles
      }}
    >
      <CardBody>
        <SkeletonItem
          styles={{
            width: "150px",
            height: "224px",
            marginBottom: "1.27em"
          }}
        />
        <PhotoName />
        <ContentSection>
          <NameSection>
            <SkeletonItem />
            <SkeletonItem styles={{ marginTop: '0.5em' }} />
          </NameSection>
        </ContentSection>
      </CardBody>
      <CardFooter>
        <SkeletonItem styles={{ height: '1.6em', marginBottom: '0.5em' }} />
        <SkeletonItem />
      </CardFooter>
    </Card>
  );
}

export default SkeletonVoucherCard;