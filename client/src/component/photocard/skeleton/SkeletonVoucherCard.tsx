import React from 'react';
import { StyledPhotoCard, PhotoNameDiv, ContentSection, NameSection } from '../PhotoCardTemplate';
import Card from '@component/card/basic/Card';
import CardBody from '@component/card/basic/CardBody';
import CardFooter from '@component/card/basic/CardFooter';
import SkeletonItem from '@component/skeleton/SkeletonItem';

interface Props {
}
const DefaultProps = {};

function SkeletonVoucherCard({  }: Props) {
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
              <SkeletonItem styles={{ marginTop: '0.5em' }} />
            </NameSection>
          </ContentSection>
        </CardBody>
        <CardFooter>
          <SkeletonItem styles={{ height: '1.6em', marginBottom: '0.5em' }} />
          <SkeletonItem />
        </CardFooter>
      </Card>
    </StyledPhotoCard>
  );
}

export default SkeletonVoucherCard;