import { useEffect, useCallback } from 'react';
import Button from '@component/form/button/Button';

interface Props {
  cropper: Cropper;
  moveX: number;
  moveY: number;
}

function Move({ cropper, moveX, moveY }: Props) {
  // 크롭된 부분 이동
  const handleMove = useCallback(
    (direction: 'w' | 'a' | 's' | 'd') => {
      switch (direction) {
        case 'w':
          cropper.move(0, moveY);
          break;
        case 's':
          cropper.move(0, -1 * moveY);
          break;
        case 'a':
          cropper.move(moveX, 0);
          break;
        case 'd':
          cropper.move(-1 * moveX, 0);
          break;
        default:
          break;
      }
    },
    [cropper, moveX, moveY]
  );

  // 키보드로 조작 가능
  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;
      if (e.key === 'w' || e.key === 'a' || e.key === 's' || e.key === 'd') handleMove(e.key);
    };
    window.addEventListener('keydown', handle);

    return () => {
      window.removeEventListener('keydown', handle);
    };
  }, [handleMove]);

  return (
    <>
      <Button
        buttonTheme="primary"
        onClick={() => handleMove('a')}
        css={{
          padding: '0.3em',
          fontSize: '1rem',
        }}
      >
        ←
      </Button>
      <Button
        buttonTheme="primary"
        onClick={() => handleMove('d')}
        css={{
          padding: '0.3em',
          fontSize: '1rem',
        }}
      >
        →
      </Button>
      <Button
        buttonTheme="primary"
        onClick={() => handleMove('w')}
        css={{
          padding: '0.3em 0.5em',
          fontSize: '1rem',
        }}
      >
        ↑
      </Button>
      <Button
        buttonTheme="primary"
        onClick={() => handleMove('s')}
        css={{
          padding: '0.3em 0.5em',
          fontSize: '1rem',
        }}
      >
        ↓
      </Button>
    </>
  );
}

export default Move;
