import React from 'react';
import Button from '@component/form/Button';
import { faTruckFast } from '@fortawesome/free-solid-svg-icons';

interface Props {

}
const DefaultProps = {};

function ShippingLink({  }: Props) {
  return (
    <Button
      leftIcon={faTruckFast}
      styles={{
        theme: "pink",
        iconMargin: "3.6em"
      }}
    >배송 요청하기</Button>
  );
}

export default ShippingLink;