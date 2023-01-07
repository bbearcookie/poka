import React from 'react';
import useGroupQuery from '@api/query/group/useGroupQuery';
import { State, Action } from '../../reducer';
import Success from './Success';
import Loading from './Loading';

interface Props {
  state: State;
  dispatch: React.Dispatch<Action>;
}
const DefaultProps = {};

function MemberSelect({ state, dispatch }: Props) {
  const { data: group, status } = useGroupQuery(state.select.groupId);

  return (
    <>
      {status === 'success' && <Success group={group} state={state} dispatch={dispatch} />}
      {status === 'loading' && <Loading />}
    </>
  );
}

export default MemberSelect;