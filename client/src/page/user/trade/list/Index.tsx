import React, { useReducer } from 'react';
import GroupSelect from './content/group/GroupSelect';
import MemberSelect from './content/member/MemberSelect';
import TradeSection from './content/TradeSection';
import reducer, { initialState } from './reducer';
import './Index.scss';

interface Props {

}
const DefaultProps = {};

function Index({  }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="TradeListPage">
      <GroupSelect state={state} dispatch={dispatch} />
      {state.select.groupId > 0 && <MemberSelect state={state} dispatch={dispatch} />}
      <TradeSection state={state} dispatch={dispatch} />
    </div>
  );
}

export default Index;