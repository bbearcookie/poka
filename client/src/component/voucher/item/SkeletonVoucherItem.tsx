import React from 'react';
import SkeletonItem from '@component/skeleton/SkeletonItem';
import SkeletonPhotocardItem from '@component/photocard/new/item/SkeletonPhotocardItem';

interface Props {
  showOwner?: boolean;
}

function SkeletonVoucherItem({ showOwner = true }: Props) {
  return (
    <SkeletonPhotocardItem>
      <SkeletonItem styles={{ height: '1.5em', marginBottom: '0.5em' }} />
      {showOwner && <SkeletonItem />}
    </SkeletonPhotocardItem>
  );
}

export default SkeletonVoucherItem;
