import React, { useCallback } from 'react';
import Input from '@component/form/Input';

interface FormProps {
  moveX: number;
  setMoveX: React.Dispatch<React.SetStateAction<number>>;
  moveY: number;
  setMoveY: React.Dispatch<React.SetStateAction<number>>;
  children?: React.ReactNode;
}
const FormDefaultProps = {};

function Form({ moveX, setMoveX, moveY, setMoveY, children }: FormProps & typeof FormDefaultProps) {
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
          display="inline-block"
          width="100%"
          height="2em"
          marginLeft="0.5em"
          marginRight="1em"
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
          display="inline-block"
          width="100%"
          height="2em"
          marginLeft="0.5em"
          marginRight="1em"
        />
      </section>
    </>
  );
}

Form.defaultProps = FormDefaultProps;
export default Form;