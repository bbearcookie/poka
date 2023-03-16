import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import IconButton from '@component/form/IconButton';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { getYearMonthDay } from '@util/date';
import UserProfile from '@component/profile/UserProfile';
import StateLabel from '@component/label/stateLabel/StateLabel';
import { StyledShipping } from './_styles';
import { Payment, ShippingRequest } from '@type/shipping';
import { UserType } from '@type/user';

interface Props {
  request: ShippingRequest;
  payment: Pick<Payment, 'state'>;
  author: UserType,
  voucherAmount: number;
  to?: string;
}

function Shipping({ request, payment, author, voucherAmount, to }: Props) {
  const navigate = useNavigate();

  // 상세 페이지 이동
  const onClick = useCallback(() => {
    if (to) navigate(`${to}/${request.requestId}`);
  }, [navigate, request, to]);

  return (
    <StyledShipping onClick={onClick}>
      <td><UserProfile {...author} /></td>
      <td>
        <StateLabel
          state={{ type: "shipping", key: request.state }}
          styles={{ padding: "0.5em" }}
        />
      </td>
      <td>
        <StateLabel
          state={{ type: "payment", key: payment.state }}
          styles={{ padding: "0.5em" }}
        />
      </td>
      <td>{voucherAmount}장</td>
      <td>{getYearMonthDay(new Date(request.writtenTime))}</td>
      <td><IconButton icon={faArrowRight} /></td>
    </StyledShipping>
  );
}

export default Shipping;