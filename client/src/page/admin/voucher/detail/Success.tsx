import React from 'react';
import VoucherInfoCard from '@component/photocard/voucher/voucher_info/VoucherInfoCard';
import PhotoInfoCard from '@component/photocard/photo/PhotoInfoCard';
import { ResType as VoucherResType } from '@api/query/voucher/useVoucherQuery';
import VoucherRemove from './content/VoucherRemove';

interface Props {
  voucher: VoucherResType;
}
const DefaultProps = {};

function Success({ voucher }: Props) {
  if (!voucher) return <></>;

  return (
    <>
      <PhotoInfoCard photoName={voucher.name} groupName={voucher.group_name} memberName={voucher.member_name} imageName={voucher.image_name} />
      <VoucherInfoCard voucher={voucher} showAdminInfo={true} />
      <VoucherRemove voucherId={voucher.voucher_id} />
    </>
  );
}

export default Success;