import React from 'react';
import { Card, CardHeader, CardBody } from '@component/card/basic/_styles';
import Button from '@component/form/button/Button';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

interface Props {
  titleText?: string;
  buttonText?: string;
  onClick?: React.MouseEventHandler;
  children?: React.ReactNode;
}

function RemoveCard({ titleText, buttonText = '삭제', onClick, children, ...rest }: Props) {
  return (
    <Card {...rest}>
      <CardHeader>
        <h1 className="title">{titleText}</h1>
      </CardHeader>
      <CardBody>
        <Button
          leftIcon={faTrashCan}
          onClick={onClick}
          iconMargin='1em'
          buttonTheme="danger-outlined"
          css={{
            marginBottom: '1em',
            padding: '0.7em 1.3em',
          }}
        >
          {buttonText}
        </Button>
        {children}
      </CardBody>
    </Card>
  );
}

export default RemoveCard;
