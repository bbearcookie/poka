import { useState, useCallback } from 'react';

export interface ItemListHook {
  childIds: number[];
  registerToParent: (childId: number) => void;
}

export default function useItemList(): ItemListHook {
  const [childIds, setChildIds] = useState<number[]>([]);

  const registerToParent = useCallback((childId: number) => {
    setChildIds(prev => prev.concat(childId));
  }, []);

  return { childIds, registerToParent };
}
