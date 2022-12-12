import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@component/form/Button';
import { faShareNodes, faTruckFast } from '@fortawesome/free-solid-svg-icons';

interface ButtonSectionProps {
  voucherId: number;
  children?: React.ReactNode;
}
const ButtonSectionDefaultProps = {};

function ButtonSection({ voucherId, children }: ButtonSectionProps & typeof ButtonSectionDefaultProps) {
  return (
    <section className="button-section">
      <Link to={`/trade/writer?voucherId=${voucherId}`}>
        <Button
          leftIcon={faShareNodes}
          styles={{
            theme: "primary",
            iconMargin: "3em"
          }}
        >교환글 작성하기</Button>
      </Link>
      <Button
        leftIcon={faTruckFast}
        styles={{
          theme: "pink",
          iconMargin: "3.6em"
        }}
      >배송 요청하기</Button>
    </section>
  );
}

ButtonSection.defaultProps = ButtonSectionDefaultProps;
export default ButtonSection;