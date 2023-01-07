import React from 'react';
import useGroupsQuery from '@api/query/group/useGroupsQuery';
import { State, Action } from '../../reducer';
import Success from './Success';
import Loading from './Loading';

interface Props {
  state: State;
  dispatch: React.Dispatch<Action>;
}
const DefaultProps = {};

function GroupSelect({ state, dispatch }: Props) {
  const { data: groups, status } = useGroupsQuery();

  return (
    <>
      {status === 'success' && <Success groups={groups} state={state} dispatch={dispatch} />}
      {status === 'loading' && <Loading />}
    </>
  );
}

export default GroupSelect;