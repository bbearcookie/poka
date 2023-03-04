import React, { useCallback } from 'react';
import { State, Action } from '@component/list/new/filter/reducer';
import Keyword from './content/_Keyword';

interface Props {
  state: State;
  dispatch: React.Dispatch<Action>;
};

function MemberKeywords({ state, dispatch }: Props) {

  // 필터에 아이템 추가 or 제거
  const handleToggleItem = useCallback((id: number) => {
    dispatch({ type: "TOGGLE_MEMBER", id });
  }, [dispatch]);

  return (
    <>
      {state.members.filter(m => m.checked).map(m => 
        <Keyword
          key={m.id}
          category="멤버"
          text={m.name}
          handleClick={() => handleToggleItem(m.id)}
        />
      )}
    </>
  );
}

export default MemberKeywords;