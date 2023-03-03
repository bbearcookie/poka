import React, { useReducer } from 'react';
import TitleLabel from '@component/label/titleLabel/TitleLabel';
import Card from '@component/card/basic/Card';
import CardBody from '@component/card/basic/CardBody';
import GroupFilter from '@component/list/new/filter/GroupFilter';
import MemberFilter from '@component/list/new/filter/MemberFilter';
import reducer, { initialState } from '@component/list/new/filter/reducer';
import './Index.scss';

interface Props {}

function Index({  }: Props) {
  const [filter, filterDispatch] = useReducer(reducer, initialState);

  return (
    <div className="AdminShippingListPage">
      <TitleLabel title="배송요청 목록" styles={{ marginBottom: "1em" }} />
      <Card>
        <CardBody>
          <GroupFilter state={filter} dispatch={filterDispatch} />
          <MemberFilter state={filter} dispatch={filterDispatch} />
        </CardBody>
      </Card>
    </div>
  );
}

export default Index;