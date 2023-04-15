import React, { useCallback } from 'react';
import DropdownItem from '@component/dropdown/DropdownItem';
import Filter from './content/_Filter';
import { State, Action } from './reducer';

interface Props {
  show: boolean;
  state: State;
  dispatch: React.Dispatch<Action>;
}

function MemberFilter({ show, state, dispatch }: Props) {
  // 아이템 클릭시 필터에 추가 or 제거
  const handleClickItem = useCallback(
    (id: number) => {
      dispatch({ type: 'TOGGLE_MEMBER', id });
    },
    [dispatch]
  );

  if (show)
    return (
      <Filter title="멤버">
        {state.members.length === 0 && (
          <DropdownItem className="item">
            <input type="checkbox" checked={true} readOnly />
            <span>전체</span>
          </DropdownItem>
        )}

        {state.members.map(m => (
          <DropdownItem key={m.id} className="item" onClick={() => handleClickItem(m.id)}>
            <input type="checkbox" checked={m.checked} readOnly />
            <span>{m.name}</span>
          </DropdownItem>
        ))}
      </Filter>
    );
  else return <></>;
}

export default MemberFilter;
