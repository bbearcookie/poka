import React, { useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import IconButton from '@component/form/IconButton';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { getYearMonthDay } from '@util/date';
import UserProfile from '@component/profile/UserProfile';
import StateLabel from '@component/label/stateLabel/StateLabel';
import { ShippingStateKey, PaymentStateKey } from '@component/label/stateLabel/_types';
import { StyledShipping } from './_styles';

interface Props {
  requestId: number;
  username: string;
  nickname: string;
  userImageName: string;
  shippingState: ShippingStateKey;
  paymentState: PaymentStateKey;
  voucherAmount: number;
  writtenTime: string;
}

function Shipping({ requestId, username, nickname, userImageName, shippingState, paymentState, voucherAmount, writtenTime }: Props) {
  const navigate = useNavigate();

  const onClick = useCallback(() => {
    console.log(`TODO: ${requestId} 상세 이동`);
  }, [requestId]);

  return (
    <StyledShipping onClick={onClick}>
      <td>
        <UserProfile
          username={username}
          nickname={nickname}
          imageName={userImageName}
        />
      </td>
      <td>
        <StateLabel
          state={{ type: "shipping", key: shippingState }}
          styles={{ padding: "0.5em" }}
        />
      </td>
      <td>
        <StateLabel
          state={{ type: "payment", key: paymentState }}
          styles={{ padding: "0.5em" }}
        />
      </td>
      <td>{voucherAmount}장</td>
      <td>{getYearMonthDay(new Date(writtenTime))}</td>
      <td>
        <Link className="action-section" to="#">
          <IconButton icon={faArrowRight} />
        </Link>
      </td>
    </StyledShipping>
  );
}

export default Shipping;