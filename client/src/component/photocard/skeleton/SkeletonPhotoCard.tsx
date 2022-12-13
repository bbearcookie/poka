import React from 'react';
import { StyledPhotoCard, PhotoNameDiv, ContentSection, NameSection } from '../PhotoCardTemplate';
import Card from '@component/card/basic/Card';
import CardBody from '@component/card/basic/CardBody';
import SkeletonItem from '@component/skeleton/SkeletonItem';

interface Props {
}
const DefaultProps = {};

function SkeletonPhotoCard({  }: Props) {
  return (
    <StyledPhotoCard className="PhotoCard">
      <Card styles={{ boxShadow: "0px 0px 10px 0px #C0C0C0"}}>
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
    </StyledPhotoCard>
  );
}

export default SkeletonPhotoCard;