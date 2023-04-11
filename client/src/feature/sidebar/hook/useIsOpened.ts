import { useState, useCallback } from 'react';

export function useIsOpened() {
  const [isOpened, setIsOpened] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpened(!isOpened);
  }, [isOpened]);

  return { isOpened, toggleOpen };
}
