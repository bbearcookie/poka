import React, { useCallback } from 'react';
import { State, Action } from '@component/list/new/filter/reducer';
import Keyword from './content/_Keyword';

interface Props {
  state: State;
  dispatch: React.Dispatch<Action>;
}

function GroupKeywords({ state, dispatch }: Props) {

  // 필터에 아이템 추가 or 제거
  const handleToggleItem = useCallback((id: number) => {
    dispatch({ type: "TOGGLE_GROUP", id });
  }, [dispatch]);

  return (
    <>
      {state.groups.filter(g => g.checked).map(g =>
        <Keyword
          key={g.id}
          category="그룹"
          text={g.name}
          handleClick={() => handleToggleItem(g.id)}
        />
      )}
    </>
  );
}

export default GroupKeywords;