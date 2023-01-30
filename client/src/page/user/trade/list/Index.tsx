import React, { useReducer } from 'react';
import { Link } from 'react-router-dom';
import GroupSelect from './content/group/GroupSelect';
import MemberSelect from './content/member/MemberSelect';
import TradeSection from './content/TradeSection';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import Button from '@component/form/Button';
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
      <section className="add-button-section">
        <Link to="/trade/writer">
          <Button leftIcon={faPen} styles={{ theme: "primary", marginBottom: "2em", iconMargin: "1em" }}>등록</Button>
        </Link>
      </section>
      <TradeSection state={state} dispatch={dispatch} />
    </div>
  );
}

export default Index;