import React from 'react';
import VoucherInfoCard from '@component/photocard/voucher/voucher_info/VoucherInfoCard';
import PhotoInfoCard from '@component/photocard/photo/PhotoInfoCard';
import { ResType } from '@api/query/voucher/useVoucherQuery';
import VoucherRemove from './content/VoucherRemove';

interface Props {
  res: ResType;
}

function Success({ res }: Props) {
  if (!res) return <></>;

  return (
    <>
      <PhotoInfoCard
        photoName={res.photo.name}
        groupName={res.photo.groupData.name}
        memberName={res.photo.memberData.name}
        imageName={res.photo.imageName}
        cardStyles={{ margin: "0 auto 5em auto" }}
      />
      <VoucherInfoCard res={res} showAdminInfo={true} />
      <VoucherRemove voucherId={res.voucherId} />
    </>
  );
}

export default Success;