import React from 'react';
import { PhotoNameDiv, ContentSection, NameSection } from '../PhotoCardTemplate';
import Card from '@component/card/basic/Card';
import CardBody from '@component/card/basic/CardBody';
import SkeletonItem from '@component/skeleton/SkeletonItem';
import { StylesProps } from '@component/card/basic/Card';

interface Props {
  cardStyles?: StylesProps;
}
const DefaultProps = {};

function SkeletonPhotoCard({ cardStyles }: Props) {
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
        <PhotoNameDiv />
        <ContentSection>
          <NameSection>
            <SkeletonItem />
            <SkeletonItem styles={{ marginTop: "0.5em" }} />
          </NameSection>
        </ContentSection>
      </CardBody>
    </Card>
  );
}

export default SkeletonPhotoCard;