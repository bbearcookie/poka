import React, { useState } from 'react';
import TitleLabel from '@component/label/TitleLabel';
import { Card, CardHeader, CardBody, CardFooter } from '@component/card/basic/_styles';
import Form from './Form';
import Move from './Move';

interface Props {
  cropper: Cropper;
  children?: React.ReactNode;
}

function ControlCard({ cropper }: Props) {
  const [moveX, setMoveX] = useState(0);
  const [moveY, setMoveY] = useState(0);

  return (
    <Card>
      <CardHeader>
        <TitleLabel title="영역 이동" />
      </CardHeader>
      <CardBody>
        <Form moveX={moveX} setMoveX={setMoveX} moveY={moveY} setMoveY={setMoveY} />
      </CardBody>
      <CardFooter css={{ display: 'flex', flexWrap: 'wrap', gap: '0.5em' }}>
        <Move cropper={cropper} moveX={moveX} moveY={moveY} />
      </CardFooter>
    </Card>
  );
}

export default ControlCard;
