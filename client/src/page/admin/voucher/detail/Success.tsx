import VoucherInfo from '@component/voucher/info/VoucherInfo';
import PhotoInfo from '@component/photocard/info/PhotoInfo';
import { ResType } from '@api/query/voucher/useVoucherQuery';
import VoucherRemove from './content/VoucherRemove';

interface Props {
  res: ResType;
}

function Success({ res }: Props) {
  if (!res) return <></>;

  return (
    <>
      <PhotoInfo {...res.photo} styles={{ margin: '0 auto 5em auto' }} />
      <VoucherInfo
        displayType="admin"
        voucher={res}
        styles={{ marginBottom: '5em' }}
      />
      <VoucherRemove voucherId={res.voucherId} />
    </>
  );
}

export default Success;
