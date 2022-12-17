import React from 'react';
import * as voucherAPI from '@api/voucherAPI';
import VoucherInfoCard from '@component/card/VoucherInfoCard';
import PhotoInfoCard from '@component/photocard/detail/PhotoInfoCard';
import { ResType as VoucherResType } from '@api/query/voucher/useVoucherQuery';
import VoucherInfo from './content/VoucherInfo';
import VoucherRemove from './content/VoucherRemove';

interface Props {
  voucher: VoucherResType;
}
const DefaultProps = {};

function Success({ voucher }: Props) {
  if (!voucher) return <></>;

  return (
    <>
      <PhotoInfoCard photo={voucher} />
      <VoucherInfoCard voucher={voucher} showAdminInfo={true} />
      <VoucherRemove voucherId={voucher.voucher_id} />
    </>
  );
}

export default Success;