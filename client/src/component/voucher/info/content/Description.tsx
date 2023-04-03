import StateLabel from '@component/label/stateLabel/StateLabel';
import { StyledDescription } from './_styles';

function Description() {
  return (
    <StyledDescription>
      <p className="description">상태는 플랫폼 내에서 발급된 이 소유권의 상태를 나타냅니다.</p>
      <br />

      <ul className="states">
        <li className="state-item">
          <StateLabel state={{ type: 'voucher', key: 'available' }} styles={{ width: '6em' }} />
          <span>사용자끼리 교환이 가능한 상태입니다.</span>
        </li>

        <li className="state-item">
          <StateLabel state={{ type: 'voucher', key: 'trading' }} styles={{ width: '6em' }} />
          <span>소유권으로 교환글을 등록한 상태입니다.</span>
        </li>

        <li className="state-item">
          <StateLabel state={{ type: 'voucher', key: 'shipping' }} styles={{ width: '6em' }} />
          <span>사용자가 소유권을 실물로 받기 위해 관리자에게 배송요청한 상태입니다.</span>
        </li>

        <li className="state-item">
          <StateLabel state={{ type: 'voucher', key: 'shipped' }} styles={{ width: '6em' }} />
          <span>관리자가 사용자에게 포토카드를 발송한 상태입니다.</span>
        </li>
      </ul>
    </StyledDescription>
  );
}

export default Description;
