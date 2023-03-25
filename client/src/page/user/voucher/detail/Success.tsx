import React from 'react';
import VoucherInfoCard from '@component/photocard/voucher/voucher_info/VoucherInfoCard';
import PhotoInfo from '@component/photocard/new/info/PhotoInfo';
import { ResType } from '@api/query/voucher/useVoucherQuery';
import ButtonSection from './content/ButtonSection';

interface Props {
  res: ResType;
}

function Success({ res }: Props) {
  if (!res) return <></>;

  return (
    <>
      <PhotoInfo
        {...res.photo}
        styles={{ margin: '0 auto 5em auto' }}
      />
      <VoucherInfoCard res={res} showAdminInfo={false} />
      <ButtonSection res={res} />
    </>
  );
}

export default Success;
