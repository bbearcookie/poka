import React from 'react';
import VoucherInfoCard from '@component/photocard/voucher/voucher_info/VoucherInfoCard';
import PhotoInfoCard from '@component/photocard/photo/PhotoInfoCard';
import { ResType as VoucherResType } from '@api/query/voucher/useVoucherQuery';
import VoucherRemove from './content/VoucherRemove';

interface Props {
  voucher: VoucherResType;
}

function Success({ voucher }: Props) {
  if (!voucher) return <></>;

  return (
    <>
      <PhotoInfoCard
        photoName={voucher.name}
        groupName={voucher.groupName}
        memberName={voucher.memberName}
        imageName={voucher.imageName}
        cardStyles={{ margin: "0 auto 5em auto" }}
      />
      <VoucherInfoCard voucher={voucher} showAdminInfo={true} />
      <VoucherRemove voucherId={voucher.voucherId} />
    </>
  );
}

export default Success;