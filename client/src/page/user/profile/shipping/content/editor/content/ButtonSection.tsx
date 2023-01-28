import React from 'react';
import Button from '@component/form/Button';
import { ShippingAddressType } from '@type/user';

interface Props {
  address?: ShippingAddressType;
  closeEditor: () => void;
}
const DefaultProps = {};

function ButtonSection({ address, closeEditor }: Props) {
  return (
    <section className="button-section">
      <Button 
        type="submit"
        styles={{
          theme: "primary",
          padding: "0.7em 1em",
          marginLeft: "0.5em"
        }}
      >{address ? "수정" : "등록"}</Button>
      <Button
        onClick={closeEditor}
        styles={{
          theme: "gray-outlined",
          padding: "0.7em 1em",
          marginLeft: "0.5em"
        }}
      >취소</Button>
    </section>
  );
}

export default ButtonSection;