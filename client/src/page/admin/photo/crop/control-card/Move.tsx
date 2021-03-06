import React, { useEffect, useCallback } from 'react';
import Button from '@component/form/Button';

interface MoveProps {
  cropper: Cropper;
  moveX: number;
  moveY: number;
  children?: React.ReactNode;
}
const MoveDefaultProps = {};

function Move({ cropper, moveX, moveY, children }: MoveProps & typeof MoveDefaultProps) {

  // 크롭된 부분 이동
  const handleMove = useCallback((direction: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT') => {
    switch (direction) {
      case 'UP':
        cropper.move(0, moveY);
        break;
      case 'DOWN':
        cropper.move(0, -1 * moveY);
        break;
      case 'LEFT':
        cropper.move(moveX, 0);
        break;
      case 'RIGHT':
        cropper.move(-1 * moveX, 0);
        break;
      default:
        break;
    }
  }, [cropper, moveX, moveY]);
  
  // 키보드로 조작 가능
  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      switch (e.key.toLowerCase()) {
        case 'a':
          handleMove('LEFT');
          break;
        case 'd':
          handleMove('RIGHT');
          break;
        case 'w':
          handleMove('UP');
          break;
        case 's':
          handleMove('DOWN');
          break;
        default:
          break;
      }
    }
    window.addEventListener('keypress', handle);

    return () => {
      window.removeEventListener('keypress', handle);
    }
  }, [handleMove]);

  return (
    <>
      <Button
        theme="primary"
        padding="0.3em"
        marginRight="0.5em"
        fontSize="1rem"
        onClick={() => handleMove('LEFT')}
      >←</Button>
      <Button
        theme="primary"
        padding="0.3em"
        marginRight="0.5em"
        fontSize="1rem"
        onClick={() => handleMove('RIGHT')}
      >→</Button>
      <Button
        theme="primary"
        padding="0.3em 0.5em"
        marginRight="0.5em"
        fontSize="1rem"
        onClick={() => handleMove('UP')}
      >↑</Button>
      <Button
        theme="primary"
        padding="0.3em 0.5em"
        marginRight="0.5em"
        fontSize="1rem"
        onClick={() => handleMove('DOWN')}
      >↓</Button>
    </>
  );
}

Move.defaultProps = MoveDefaultProps;
export default Move;