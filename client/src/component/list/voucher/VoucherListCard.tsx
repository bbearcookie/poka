import React, { useEffect, useReducer, useCallback } from 'react';
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

// 검색 필터에 기본적으로 적용할 값. 기본 값이 있으면 그 값에 대한 필터 변경은 불가능함.
export type DefaultFilterType = {
  owner: "all" | "mine"; // (ALL) 모든 사용자의 소유권 출력 (MINE) 자신의 소유권만 출력
  state: VoucherStateKey; // 특정 상태의 소유권만 보여주도록 지정
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
    state: "all"
  } as DefaultFilterType
};

function VoucherListCard({
  defaultFilter = DefaultProps.defaultFilter,
  icon, handleClickIcon, cardStyles
}: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const username = useAppSelector(state => state.auth.username);

  // 자신의 소유권만 보여줘야 할 경우 렌더시 자신의 아이디를 검색 필터에 추가
  const initFilter = useCallback(() => {
    if (defaultFilter.owner === "mine") dispatch({ type: "ADD_KEYWORD", target: "usernames", value: username });
    if (defaultFilter.state !== "all") dispatch({ type: "SET_VOUCHER_STATE", value: defaultFilter.state });
  }, [dispatch, defaultFilter, username]);
  useEffect(() => {
    initFilter();
  }, [defaultFilter]);

  // 검색 필터 키워드 추가
  const handleAddKeyword = useCallback((type: string, value: string) => {
    dispatch({ type: "ADD_KEYWORD", target: type as SearchKeywordsType, value });
  }, [dispatch]);

  return (
    <Card styles={cardStyles}>
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