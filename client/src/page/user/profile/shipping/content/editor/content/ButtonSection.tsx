import React from 'react';
import Button from '@component/form/Button';
import { AddressType } from '@api/shippingAddressAPI';

interface ButtonSectionProps {
  address?: AddressType;
  closeEditor: () => void;
  children?: React.ReactNode;
}
const ButtonSectionDefaultProps = {};

function ButtonSection({ address, closeEditor, children }: ButtonSectionProps & typeof ButtonSectionDefaultProps) {
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

ButtonSection.defaultProps = ButtonSectionDefaultProps;
export default ButtonSection;