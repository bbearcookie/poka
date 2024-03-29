import VoucherInfo from '@component/voucher/info/VoucherInfo';
import PhotoInfo from '@component/photocard/info/PhotoInfo';
import { ResType } from '@api/query/voucher/useVoucherQuery';
import ButtonSection from './content/ButtonSection';

interface Props {
  res: ResType;
}

function Success({ res }: Props) {
  if (!res) return <></>;

  return (
    <>
      <PhotoInfo {...res.photo} css={{ margin: '0 auto 5em auto' }} />
      <VoucherInfo displayType="user" voucher={res} cssProp={{ marginBottom: '5em' }} />
      <ButtonSection res={res} />
    </>
  );
}

export default Success;
