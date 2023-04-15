import React from 'react';
import Input from '@component/form/input/Input';

interface Props {
  moveX: number;
  moveY: number;
  setMoveX: React.Dispatch<React.SetStateAction<number>>;
  setMoveY: React.Dispatch<React.SetStateAction<number>>;
}

function Form({ moveX, setMoveX, moveY, setMoveY }: Props) {
  return (
    <>
      <section className="control-section">
        <div css={{ marginBottom: '1em' }}>
          <p css={{ margin: '0 0 0.5em 0' }}>가로</p>
          <Input
            type="number"
            name="moveX"
            min={0}
            value={moveX}
            placeholder="가로 이동 간격"
            onChange={e => setMoveX(Number(e.target.value))}
            css={{
              display: 'inline-block',
              width: '100%',
              height: '2em',
            }}
          />
        </div>
        <div>
          <p css={{ margin: '0 0 0.5em 0' }}>세로</p>
          <Input
            type="number"
            name="moveY"
            min={0}
            value={moveY}
            placeholder="세로 이동 간격"
            onChange={e => setMoveY(Number(e.target.value))}
            css={{
              display: 'inline-block',
              width: '100%',
              height: '2em',
            }}
          />
        </div>
      </section>
      <p className="description">이동 버튼을 누를 때 자르려는 영역을 얼마나 이동할 지를 지정합니다.</p>
    </>
  );
}

export default Form;
