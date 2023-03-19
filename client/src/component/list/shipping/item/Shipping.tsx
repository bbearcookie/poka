import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { photoImage } from '@api/resource';
import { getYearMonthDay } from '@util/date';
import UserProfile from '@component/profile/UserProfile';
import StateLabel from '@component/label/stateLabel/StateLabel';
import { Payment, ShippingRequest } from '@type/shipping';
import { User } from '@type/user';
import { StyledShipping, PhotoImg } from './_styles';

interface Props {
  request: ShippingRequest;
  payment: Pick<Payment, 'state'>;
  author: User,
  voucherImageName: string;
  showOwner?: boolean;
  to?: string;
}

function Shipping({ request, payment, author, voucherImageName, showOwner = false, to }: Props) {
  const navigate = useNavigate();

  // 상세 페이지 이동
  const onClick = useCallback(() => {
    if (to) navigate(`${to}/${request.requestId}`);
  }, [navigate, request, to]);

  return (
    <StyledShipping onClick={onClick}>
      {showOwner && <td><UserProfile {...author} /></td>}
      <td><PhotoImg src={photoImage(voucherImageName)} alt="이미지" /></td>
      <td>
        <StateLabel
          state={{ type: "payment", key: payment.state }}
          styles={{ width: "5em", padding: "0.5em" }}
        />
      </td>
      <td>
        <StateLabel
          state={{ type: "shipping", key: request.state }}
          styles={{ width: "5em", padding: "0.5em" }}
        />
      </td>
      <td>{getYearMonthDay(new Date(request.writtenTime))}</td>
    </StyledShipping>
  );
}

export default Shipping;