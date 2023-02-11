import React, { useEffect, useReducer, useCallback } from 'react';
import produce from 'immer';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { useAppSelector } from '@app/redux/reduxHooks';
import Card, { StylesProps as CardStyle } from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardBody from '@component/card/basic/CardBody';
import SearchInput from '@component/list/common/SearchInput';
import SearchLabelList from './content/SearchLabelList';
import FilterCheck from './content/FilterCheck';
import VoucherList from './content/VoucherList';
import { VoucherStateKey } from '@type/voucher';
import reducer, { initialState, SearchKeywordsType, SearchKeywords } from './reducer';
import '../photo/PhotoListCard.scss';

// 검색 필터에 기본적으로 적용할 값
export type DefaultFilterType = {
  owner: "all" | "mine"; // (ALL) 모든 사용자의 소유권 출력 (MINE) 자신의 소유권만 출력
  state: VoucherStateKey; // 특정 상태의 소유권만 보여주도록 지정
  excludeVoucherId: number[]; // 특정 소유권은 보여주지 않도록 할 때 사용
}

interface Props {
  defaultFilter?: DefaultFilterType;
  icon?: IconDefinition;
  handleClickIcon?: (voucherId: number) => void;
  cardStyles?: CardStyle;
}
const DefaultProps = {
  defaultFilter: {
    owner: "all",
    state: "all",
    excludeVoucherId: []
  } as DefaultFilterType
};

function VoucherListCard({
  defaultFilter = DefaultProps.defaultFilter,
  icon, handleClickIcon, cardStyles
}: Props) {
  const username = useAppSelector(state => state.auth.username);
  const [state, dispatch] = useReducer(reducer, initialState);

  // 자신의 소유권만 보여줘야 할 경우 렌더시 자신의 아이디를 검색 필터에 추가
  const initFilter = useCallback(() => {
    if (defaultFilter.owner === "mine") dispatch({ type: "ADD_KEYWORD", target: "usernames", value: username });
    if (defaultFilter.state !== "all") dispatch({ type: "SET_VOUCHER_STATE", value: defaultFilter.state });
    if (defaultFilter.excludeVoucherId.length > 0) dispatch({ type: "SET_EXCLUDE_VOUCHER_ID", payload: defaultFilter.excludeVoucherId });
  }, [dispatch, defaultFilter, username]);
  useEffect(() => {
    initFilter();
  }, [defaultFilter]);

  // 검색 필터 키워드 추가
  const handleAddKeyword = useCallback((type: string, value: string) => {
    dispatch({ type: "ADD_KEYWORD", target: type as SearchKeywordsType, value });
  }, [dispatch]);

  return (
    <Card styles={{ minHeight: "50em",  ...cardStyles}}>
      <CardHeader styles={{ padding: "0", borderBottom: "0" }}>
        {defaultFilter.owner === "all" && <SearchInput keywords={SearchKeywords} addKeyword={handleAddKeyword} />}
        <SearchLabelList state={state} dispatch={dispatch} defaultFilter={defaultFilter} />
      </CardHeader>
      <CardBody>
        <FilterCheck state={state} dispatch={dispatch} defaultFilter={defaultFilter} />
        <VoucherList state={state} dispatch={dispatch} defaultFilter={defaultFilter} icon={icon} handleClickIcon={handleClickIcon} />
      </CardBody>
    </Card>
  );
}

export default VoucherListCard;