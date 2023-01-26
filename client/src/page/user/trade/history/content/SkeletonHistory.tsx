import React from 'react';
import CardListItem from '@component/card/basic/CardListItem';
import SkeletonItem from '@component/skeleton/SkeletonItem';
import SkeletonUserProfile from '@component/profile/SkeletonUserProfile';

interface Props {

}
const DefaultProps = {};

function SkeletonHistory({  }: Props) {
  return (
    <>
      <CardListItem title={<SkeletonItem styles={{ height: "1.75em" }} />} styles={{ borderBottom: "none" }}>
        <SkeletonItem styles={{ width: "23em", height: "17em" }} />
      </CardListItem>
      <CardListItem title={<SkeletonItem styles={{ height: "1.75em" }} />} styles={{ borderBottom: "none" }}>
        <SkeletonUserProfile />
      </CardListItem>
      <CardListItem title={<SkeletonItem styles={{ height: "1.75em" }} />} styles={{ borderBottom: "none" }}>
        <SkeletonUserProfile />
      </CardListItem>
      <CardListItem title={<SkeletonItem styles={{ height: "1.75em" }} />} styles={{ borderBottom: "none" }}>
        <SkeletonItem styles={{ width: "23em", height: "1.75em" }} />
      </CardListItem>
    </>
  );
}

export default SkeletonHistory;