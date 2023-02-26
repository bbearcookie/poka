import React from 'react';
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import Button from '@component/form/Button';

interface Props {

}
const DefaultProps = {};

function Payment({  }: Props) {
  return (
    <Button
      leftIcon={faCoins}
      styles={{
        theme: "primary",
        width: "7em",
        iconMargin: "1em"
      }}
    >결제</Button>
  );
}

export default Payment;