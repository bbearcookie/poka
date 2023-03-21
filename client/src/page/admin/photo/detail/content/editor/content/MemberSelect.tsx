import React, { useCallback } from 'react';
import useGroupQuery from '@api/query/group/useGroupQuery';
import Select from '@component/form/Select';
import InputMessage from '@component/form/InputMessage';
import { State, Action } from '../reducer';

interface Props {
  state: State;
  dispatch: React.Dispatch<Action>;
}
const DefaultProps = {};

function MemberSelect({ state, dispatch }: Props) {
  const memberQuery = useGroupQuery(state.form.groupId);

  // 멤버 선택 변경
  const onChangeMember = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: 'SET_MEMBER_ID', memberId: Number(e.target.value) });
    dispatch({ type: 'SET_MESSAGE', payload: { target: 'memberId', value: '' } });
  }, [dispatch]);

  return (
    <section className="input-section">
      <p className="label">멤버</p>
      <Select
        value={state.form.memberId}
        onChange={onChangeMember}
        styles={{
          width: "100%",
          height: "2.5rem"
        }}
      >
        <option value={0}>선택</option>
        {memberQuery.data?.members.map((item) => (
          <option key={item.memberId} value={item.memberId}>{item.name}</option>
        ))}
      </Select>
      {state.message.memberId && <InputMessage>{state.message.memberId}</InputMessage>}
    </section>
  );
}

export default MemberSelect;