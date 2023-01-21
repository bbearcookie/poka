import React, { useState, useCallback } from 'react';
import Card from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardBody from '@component/card/basic/CardBody';
import CardFooter from '@component/card/basic/CardFooter';
import Form from './Form';
import Move from './Move';

interface Props {
  cropper: Cropper,
  children?: React.ReactNode;
}
const DefaultProps = {};

function ControlCard({ cropper }: Props) {
  const [moveX, setMoveX] = useState(0);
  const [moveY, setMoveY] = useState(0);

  return (
    <Card className="control-card">
      <CardBody>
        <p className="label">영역 이동</p>
        <Form moveX={moveX} setMoveX={setMoveX} moveY={moveY} setMoveY={setMoveY} />
      </CardBody>
      <CardFooter>
        <Move cropper={cropper} moveX={moveX} moveY={moveY} />
      </CardFooter>
    </Card>
  );
}

export default ControlCard;