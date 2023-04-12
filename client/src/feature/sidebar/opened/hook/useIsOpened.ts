import { useState, useCallback } from 'react';

export default function useIsOpened() {
  const [isOpened, setIsOpened] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpened(!isOpened);
  }, [isOpened]);

  return { isOpened, toggleOpen };
}
