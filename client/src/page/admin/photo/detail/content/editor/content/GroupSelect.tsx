import React, { useCallback } from 'react';
import useGroupsQuery from '@api/query/group/useGroupsQuery';
import Select from '@component/form/Select';
import InputMessage from '@component/form/InputMessage';
import { State, Action } from '../reducer';

interface Props {
  state: State;
  dispatch: React.Dispatch<Action>;
}
const DefaultProps = {};

function GroupSelect({ state, dispatch }: Props) {
  const groupQuery = useGroupsQuery();

  // 그룹 선택 변경
  const onChangeGroup = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: 'SET_GROUP_ID', groupId: Number(e.target.value) });
    dispatch({ type: 'SET_MEMBER_ID', memberId: 0 });
    dispatch({ type: 'SET_MESSAGE', payload: { target: 'groupId', value: '' } });
  }, [dispatch]);

  return (
    <section className="input-section">
      <p className="label">그룹</p>
      <Select
        value={state.form.groupId}
        onChange={onChangeGroup}
        styles={{
          width: "100%",
          height: "2.5rem"
        }}
      >
        <option value={0}>선택</option>
        {groupQuery.data?.groups.map((item) => (
          <option key={item.group_id} value={item.group_id}>{item.name}</option>
        ))}
      </Select>
      {state.message.groupId && <InputMessage>{state.message.groupId}</InputMessage>}
    </section>
  );
}

export default GroupSelect;