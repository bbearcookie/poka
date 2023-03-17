import React from 'react';
import CardListItem from '@component/card/basic/CardListItem';
import SkeletonItem from '@component/skeleton/SkeletonItem';
import SkeletonUserProfile from '@component/profile/SkeletonUserProfile';
import SkeletonPhotoInfoCard from '@component/photocard/photo/SkeletonPhotoInfoCard';

function SkeletonHistory() {
  return (
    <>
      <CardListItem title={<SkeletonItem styles={{ height: "1.75em" }} />} styles={{ borderBottom: "none" }}>
        <SkeletonPhotoInfoCard />
      </CardListItem>
      <CardListItem title={<SkeletonItem styles={{ height: "1.75em" }} />} styles={{ borderBottom: "none" }}>
        <SkeletonUserProfile />
      </CardListItem>
      <CardListItem title={<SkeletonItem styles={{ height: "1.75em" }} />} styles={{ borderBottom: "none" }}>
        <SkeletonUserProfile />
      </CardListItem>
      <CardListItem title={<SkeletonItem styles={{ height: "1.75em" }} />} styles={{ borderBottom: "none" }}>
        <SkeletonItem styles={{ width: "15em", height: "1.75em" }} />
      </CardListItem>
    </>
  );
}

export default SkeletonHistory;