import React from 'react';
import CardListItem from '@component/card/basic/CardListItem';
import SkeletonItem from '@component/skeleton/SkeletonItem';
import SkeletonUserProfile from '@component/profile/SkeletonUserProfile';
import SkeletonPhotoInfo from '@component/photocard/info/SkeletonPhotoInfo';
import { HistorySection } from './_styles';

function SkeletonHistory() {
  return (
    <HistorySection>
      <CardListItem title={<SkeletonItem styles={{ width: '5em', height: '1.75em' }} />}>
        <SkeletonPhotoInfo />
      </CardListItem>
      <CardListItem title={<SkeletonItem styles={{ width: '5em', height: '1.75em' }} />}>
        <SkeletonUserProfile />
      </CardListItem>
      <CardListItem title={<SkeletonItem styles={{ width: '5em', height: '1.75em' }} />}>
        <SkeletonUserProfile />
      </CardListItem>
      <CardListItem title={<SkeletonItem styles={{ width: '5em', height: '1.75em' }} />}>
        <SkeletonItem styles={{ width: '15em', height: '1.75em' }} />
      </CardListItem>
    </HistorySection>
  );
}

export default SkeletonHistory;
