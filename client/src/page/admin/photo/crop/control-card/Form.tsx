import React, { useCallback } from 'react';
import Input from '@component/form/Input';

interface Props {
  moveX: number;
  moveY: number;
  setMoveX: React.Dispatch<React.SetStateAction<number>>;
  setMoveY: React.Dispatch<React.SetStateAction<number>>;
}
const DefaultProps = {};

function Form({ moveX, setMoveX, moveY, setMoveY }: Props) {
  return (
    <>
      <section className="input-line">
        <span className="input-label">가로</span>
        <Input
          type="number"
          name="moveX"
          value={moveX}
          placeholder="가로 이동 간격"
          onChange={(e) => setMoveX(Number(e.target.value))}
          styles={{
            display: "inline-block",
            width: "100%",
            height: "2em",
            marginLeft: "0.5em",
            marginRight: "1em"
          }}
        />
      </section>
      <section className="input-line">
        <span className="input-label">세로</span>
        <Input
          type="number"
          name="moveY"
          value={moveY}
          placeholder="세로 이동 간격"
          onChange={(e) => setMoveY(Number(e.target.value))}
          styles={{
            display: "inline-block",
            width: "100%",
            height: "2em",
            marginLeft: "0.5em",
            marginRight: "1em"
          }}
        />
      </section>
    </>
  );
}

export default Form;