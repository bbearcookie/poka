import React, { useCallback } from 'react';
import DropdownItem from '@component/dropdown/DropdownItem';
import Filter from './content/_Filter';
import { State, Action } from './reducer';

interface Props {
  show: boolean;
  state: State;
  dispatch: React.Dispatch<Action>;
}

function GroupFilter({ show, state, dispatch }: Props) {
  // 아이템 클릭시 필터에 추가 or 제거
  const handleClickItem = useCallback(
    (id: number) => {
      dispatch({ type: 'TOGGLE_GROUP', id });
    },
    [dispatch]
  );

  if (show)
    return (
      <Filter title="그룹">
        {state.groups.map(g => (
          <DropdownItem key={g.id} className="item" onClick={() => handleClickItem(g.id)}>
            <input type="checkbox" checked={g.checked} readOnly />
            <span>{g.name}</span>
          </DropdownItem>
        ))}
      </Filter>
    );
  else return <></>;
}

export default GroupFilter;
