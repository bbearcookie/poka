import React from 'react';
import Card from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardBody from '@component/card/basic/CardBody';
import Button from '@component/form/Button';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

interface RemoveCardProps {
  titleText?: string;
  buttonText?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}
const RemoveCardDefaultProps = {
  buttonText: '삭제'
};

function RemoveCard({ onClick, titleText, buttonText, children }: RemoveCardProps & typeof RemoveCardDefaultProps) {
  return (
    <Card>
      <CardHeader><h1>{titleText}</h1></CardHeader>
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

RemoveCard.defaultProps = RemoveCardDefaultProps;
export default RemoveCard;