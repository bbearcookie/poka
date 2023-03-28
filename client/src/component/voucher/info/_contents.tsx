import { User } from '@type/user';
import { Link } from 'react-router-dom';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { VoucherState as VoucherStateType } from '@type/voucher';
import CardListItem from '@component/card/basic/CardListItem';
import Button from '@component/form/Button';
import StateLabel from '@component/label/stateLabel/StateLabel';
import UserProfile from '@component/profile/UserProfile';
import { StyledDescription } from './_styles';

// 소유권 ID 보여주는 컴포넌트
export function VoucherID({ voucherId }: { voucherId: number }) {
  return <CardListItem title="소유권ID">{voucherId}</CardListItem>;
}

// 소유권 주인 보여주는 컴포넌트
export function VoucherOwner({ owner }: { owner: User }) {
  return (
    <CardListItem title="소유자">
      <UserProfile {...owner} />
    </CardListItem>
  );
}

// 소유권 상태 보여주는 컴포넌트
export function VoucherState({
  voucherState,
}: {
  voucherState: VoucherStateType;
}) {
  return (
    <CardListItem title="상태">
      <StateLabel
        state={{ type: 'voucher', key: voucherState }}
        styles={{ width: '6em', margin: '0' }}
      />
    </CardListItem>
  );
}

// 기록 조회 버튼 보여주는 컴포넌트
export function VoucherLog({ voucherId }: { voucherId: number }) {
  return (
    <CardListItem title="기록">
      <Link to={`/admin/voucher/log/${voucherId}`}>
        <Button
          rightIcon={faArrowRight}
          styles={{
            theme: 'primary',
            padding: '0.7em 1.3em',
            iconMargin: '1em',
          }}>
          조회
        </Button>
      </Link>
    </CardListItem>
  );
}

// 소유권 상태 설명 보여주는 컴포넌트
export function Description() {
  return (
    <StyledDescription>
      <p className="description">
        상태는 플랫폼 내에서 발급된 이 소유권의 상태를 나타냅니다.
      </p>
      <br />

      <ul className="states">
        <li className="state-item">
          <StateLabel
            state={{ type: 'voucher', key: 'available' }}
            styles={{ width: '6em' }}
          />
          <span>사용자끼리 교환이 가능한 상태입니다.</span>
        </li>

        <li className="state-item">
          <StateLabel
            state={{ type: 'voucher', key: 'trading' }}
            styles={{ width: '6em' }}
          />
          <span>소유권으로 교환글을 등록한 상태입니다.</span>
        </li>

        <li className="state-item">
          <StateLabel
            state={{ type: 'voucher', key: 'shipping' }}
            styles={{ width: '6em' }}
          />
          <span>
            사용자가 소유권을 실물로 받기 위해 관리자에게 배송요청한 상태입니다.
          </span>
        </li>

        <li className="state-item">
          <StateLabel
            state={{ type: 'voucher', key: 'shipped' }}
            styles={{ width: '6em' }}
          />
          <span>관리자가 사용자에게 포토카드를 발송한 상태입니다.</span>
        </li>
      </ul>
    </StyledDescription>
  );
}