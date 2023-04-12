import { useState, useCallback } from 'react';

export interface ItemListHook {
  childIds: number[];
  addChild: (id: number) => void;
}

export default function useItemList(): ItemListHook {
  const [childIds, setChildIds] = useState<number[]>([]);

  const addChild = useCallback((id: number) => {
    setChildIds(prev => prev.concat(id));
  }, []);

  return { childIds, addChild };
}
