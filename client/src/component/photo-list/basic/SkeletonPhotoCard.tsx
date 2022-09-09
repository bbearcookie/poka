import React from 'react';
import { CLASS, StyledPhotoCard } from './PhotoCard';
import Card from '@component/card/basic/Card';
import CardBody from '@component/card/basic/CardBody';
import SkeletonItem from '@component/skeleton/SkeletonItem';

interface SkeletonPhotoCardProps {
  children?: React.ReactNode;
}
const SkeletonPhotoCardDefaultProps = {};

function SkeletonPhotoCard({ children }: SkeletonPhotoCardProps & typeof SkeletonPhotoCardDefaultProps) {
  return (
    <StyledPhotoCard className={CLASS}>
      <Card boxShadow="0px 0px 10px 0px #C0C0C0">
        <CardBody>
          <SkeletonItem
            styles={{
              width: "150px",
              height: "224px"
            }}
          />
          <SkeletonItem className={`${CLASS}__photocard-name`} />
          <section className={`${CLASS}__content-section`}>
            <section className={`${CLASS}__name-section`}>
              <SkeletonItem />
              <SkeletonItem styles={{ marginTop: "0.5em" }} />
            </section>
          </section>
        </CardBody>
      </Card>
    </StyledPhotoCard>
  );
}

SkeletonPhotoCard.defaultProps = SkeletonPhotoCardDefaultProps;
export default SkeletonPhotoCard;