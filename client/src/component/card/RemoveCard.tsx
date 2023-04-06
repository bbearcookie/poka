import React from 'react';
import { CardHeader, CardBody } from '@component/card/basic/_styles';
import Button from '@component/form/Button';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { RemoveCard as StyledRemoveCard } from './_styles';
import { CSSProp } from 'styled-components';

interface Props {
  titleText?: string;
  buttonText?: string;
  onClick?: React.MouseEventHandler;
  cssProp?: CSSProp;
  children?: React.ReactNode;
}

function RemoveCard({ titleText, buttonText = '삭제', onClick, cssProp, children }: Props) {
  return (
    <StyledRemoveCard css={cssProp}>
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
    </StyledRemoveCard>
  );
}

export default RemoveCard;
