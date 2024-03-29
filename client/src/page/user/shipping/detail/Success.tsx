import { useNavigate } from 'react-router';
import { ResType } from '@api/query/shipping/useShippingRequestQuery';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import ShippingRequestInfo from '@component/shipping/request/ShippingRequestInfo';
import RequestVoucherInfo from '@component/shipping/request/RequestVoucherInfo';
import Payment from '@component/shipping/request/feature/Payment';
import Remove from '@component/shipping/request/feature/Remove';
import { ButtonSection } from '@component/form/_styles';

interface Props {
  res: ResType;
}

function Success({ res }: Props) {
  const navigate = useNavigate();

  return (
    <>
      <ShippingRequestInfo shipping={res.shipping} cssProp={{ marginBottom: '5em' }} />
      <RequestVoucherInfo
        vouchers={res.vouchers}
        icon={{ svg: faArrowRight, tooltip: '상세 보기' }}
        css={{ marginBottom: '5em' }}
        handleClick={id => navigate(`/voucher/detail/${id}`)}
      />
      <ButtonSection>
        {res.shipping.payment.state === 'waiting' && <Payment res={res} />}
        {res.shipping.state !== 'shipped' && <Remove res={res} redirectTo="/shipping/list" />}
      </ButtonSection>
    </>
  );
}

export default Success;
