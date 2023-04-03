import React from 'react';
import { CardHeader, CardBody } from '@component/card/basic/_styles';
import Button from '@component/form/Button';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { RemoveCard as StyledRemoveCard } from './_styles';

interface Props {
  titleText?: string;
  buttonText?: string;
  onClick?: React.MouseEventHandler;
  children?: React.ReactNode;
}

function RemoveCard({ titleText, buttonText = '삭제', onClick, children }: Props) {
  return (
    <StyledRemoveCard>
      <CardHeader>
        <h1 className="title">{titleText}</h1>
      </CardHeader>
      <CardBody>
        <Button
          leftIcon={faTrashCan}
          onClick={onClick}
          styles={{
            theme: 'danger-outlined',
            marginBottom: '1em',
            padding: '0.7em 1.3em',
            iconMargin: '1em',
          }}
        >
          {buttonText}
        </Button>
        {children}
      </CardBody>
    </StyledRemoveCard>
  );
}

export default RemoveCard;
