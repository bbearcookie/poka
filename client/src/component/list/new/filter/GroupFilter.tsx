import React, { useCallback } from 'react';
import useGroupsQuery from '@api/query/group/useGroupsQuery';
import DropdownItem from '@component/dropdown/DropdownItem';
import Filter from './content/_Filter';
import { State, Action } from './reducer';

interface Props {
  state: State;
  dispatch: React.Dispatch<Action>;
}

function GroupFilter({ state, dispatch }: Props) {

  // 그룹 데이터 가져오고 초기 필터 상태 설정
  useGroupsQuery({
    onSuccess: (res) => {
      dispatch({
        type: 'INIT_GROUPS',
        groups: res.groups.map(g => {
          return { id: g.groupId, name: g.name, checked: false }
        })
      });
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });

  // 그룹 클릭시 필터에 추가 or 제거
  const handleClickItem = useCallback((id: number) => {
    dispatch({ type: "TOGGLE_GROUP", id });
  }, [dispatch]);
  
  return (
    <Filter title="그룹">
      {state.groups.map(g =>
      <DropdownItem
        key={g.id}
        className="item"
        onClick={() => handleClickItem(g.id)}
      >
        <input type="checkbox" checked={g.checked} readOnly />
        <span>{g.name}</span>
      </DropdownItem>)}
    </Filter>
  );
}

export default GroupFilter;