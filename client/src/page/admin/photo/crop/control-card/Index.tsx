import React, { useState, useCallback } from 'react';
import Card from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardBody from '@component/card/basic/CardBody';
import CardFooter from '@component/card/basic/CardFooter';
import Form from './Form';
import Move from './Move';

interface ControlCardProps {
  cropper: Cropper,
  cropList: string[];
  setCropList: React.Dispatch<React.SetStateAction<string[]>>;
  children?: React.ReactNode;
}
const ControlCardDefaultProps = {};

function ControlCard({ cropper, cropList, setCropList, children }: ControlCardProps & typeof ControlCardDefaultProps) {
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

ControlCard.defaultProps = ControlCardDefaultProps;
export default ControlCard;