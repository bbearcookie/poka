import React from 'react';
import Card, { StylesProps as CardStyles } from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardBody from '@component/card/basic/CardBody';
import Button from '@component/form/Button';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

interface Props {
  titleText?: string;
  buttonText?: string;
  onClick?: React.MouseEventHandler;
  cardStyles?: CardStyles;
  children?: React.ReactNode;
}
const DefaultProps = {
  buttonText: '삭제'
};

function RemoveCard({ onClick, titleText, buttonText = DefaultProps.buttonText, cardStyles, children }: Props) {
  return (
    <Card styles={cardStyles}>
      <CardHeader><h1 className="title">{titleText}</h1></CardHeader>
      <CardBody>
        <Button
          leftIcon={faTrashCan}
          onClick={onClick}
          styles={{
            theme: "danger-outlined",
            marginBottom: "1em",
            padding: "0.7em 1.3em",
            iconMargin: "1em"
          }}
        >{buttonText}</Button>

        {children}
      </CardBody>
    </Card>
  );
}

export default RemoveCard;