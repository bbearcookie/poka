import { useEffect, useCallback } from 'react';
import Button from '@component/form/Button';

interface Props {
  cropper: Cropper;
  moveX: number;
  moveY: number;
}

function Move({ cropper, moveX, moveY }: Props) {

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
        buttonTheme='primary'
        onClick={() => handleMove('LEFT')}
        css={{
          padding: "0.3em",
          fontSize: "1rem"
        }}
      >←</Button>
      <Button
        buttonTheme='primary'
        onClick={() => handleMove('RIGHT')}
        css={{
          padding: "0.3em",
          fontSize: "1rem"
        }}
      >→</Button>
      <Button
        buttonTheme='primary'
        onClick={() => handleMove('UP')}
        css={{
          padding: "0.3em 0.5em",
          fontSize: "1rem"
        }}
      >↑</Button>
      <Button
        buttonTheme='primary'
        onClick={() => handleMove('DOWN')}
        css={{
          padding: "0.3em 0.5em",
          fontSize: "1rem"
        }}
      >↓</Button>
    </>
  );
}

export default Move;