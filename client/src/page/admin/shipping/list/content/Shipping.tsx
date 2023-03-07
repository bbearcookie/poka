import React from 'react';
import { Link } from 'react-router-dom';
import IconButton from '@component/form/IconButton';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import UserProfile from '@component/profile/UserProfile';
import StateLabel from '@component/label/stateLabel/StateLabel';
import { ShippingStateKey, PaymentStateKey } from '@component/label/stateLabel/_types';

interface Props {
  username: string;
  nickname: string;
  userImageName: string;
  shippingState: ShippingStateKey;
  paymentState: PaymentStateKey;
  voucherAmount: number;
}

function Shipping({ username, nickname, userImageName, shippingState, paymentState, voucherAmount }: Props) {
  return (
    <tr>
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
      <td>{voucherAmount}</td>
      <td>
        <Link className="action-section" to="#">
          <IconButton icon={faArrowRight} />
        </Link>
      </td>
    </tr>
  );
}

export default Shipping;