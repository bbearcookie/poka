import { useParams } from 'react-router-dom';
import useShippingRequestQuery from '@api/query/shipping/useShippingRequestQuery';
import BackLabel from '@component/label/BackLabel';
import Success from './Success';
import { StyledIndex } from './_styles';

function Index() {
  const requestId = Number(useParams().requestId);
  const { data: shipping, status } = useShippingRequestQuery(requestId);

  return (
    <StyledIndex>
      <BackLabel to="/shipping/list" css={{ marginBottom: "1em" }}>배송 요청 목록</BackLabel>
      {status === 'success' && <Success res={shipping} />}
    </StyledIndex>
  );
}

export default Index;