import React from 'react';
import SkeletonItem from '@component/skeleton/SkeletonItem';
import Card, { StylesProps as CardStyles } from '@component/card/basic/Card';
import CardBody from '@component/card/basic/CardBody';
import { PhotoName } from '../PhotoCardTemplate';
import { StyledWrapper, ImageSection, InfoSection } from './PhotoInfoCard';

interface Props {
  cardStyles?: CardStyles;
}
const DefaultProps = {};

function SkeletonPhotoInfoCard({ cardStyles }: Props) {
  return (
    <Card
      className="PhotoInfoCard"
      styles={{
        width: "fit-content",
        textAlign: "center",
        boxShadow: "0px 0px 10px 0px #C0C0C0",
        ...cardStyles
      }}
    >
      <CardBody>
        <StyledWrapper>
          <ImageSection>
            <SkeletonItem styles={{ width: "9.29em", height: "14em" }} />
          </ImageSection>
          <InfoSection>
            <PhotoName width="9.5em" />
            <SkeletonItem styles={{ width: "5em", height: "2em", marginTop: "1.5em" }} />
            <SkeletonItem styles={{ width: "8em", height: "1.313em", marginTop: "0.75em" }} />
          </InfoSection>
        </StyledWrapper>
      </CardBody>
    </Card>
  );
}

export default SkeletonPhotoInfoCard;