import React, { useEffect, useLayoutEffect, useCallback } from 'react';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { useAppDispatch, useAppSelector } from '@app/redux/reduxHooks';
import Card, { StylesProps as CardStyle } from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardBody from '@component/card/basic/CardBody';
import SearchInput from '@component/list/common/SearchInput';
import SearchLabelList from './content/SearchLabelList';
import FilterCheck from './content/FilterCheck';
import VoucherList from './content/VoucherList';
import { SearchKeywords, addKeyword, SearchKeywordsType, initialize } from './voucherListSlice';
import { VoucherStateKey } from '@type/voucher';
import '../photo/PhotoListCard.scss';

// 검색 필터에 기본적으로 적용할 값. 기본 값이 있으면 그 값에 대한 필터 변경은 불가능함.
export type DefaultFilterType = {
  owner: 'ALL' | 'MINE'; // (ALL) 모든 사용자의 소유권 출력 (MINE) 자신의 소유권만 출력
  state: VoucherStateKey; // 특정 상태의 소유권만 보여주도록 지정
}

interface Props {
  resetOnMount?: boolean; // 컴포넌트가 렌더링될 때 상태값을 초기 상태로 리셋할지의 여부
  defaultFilter?: DefaultFilterType;
  icon?: IconDefinition;
  handleClickIcon?: (voucherId: number) => void;
  cardStyles?: CardStyle;
}
const DefaultProps = {
  resetOnMount: false,
  defaultFilter: {
    owner: 'ALL',
    state: 'ALL'
  } as DefaultFilterType
};

function VoucherListCard({
  resetOnMount = DefaultProps.resetOnMount,
  defaultFilter = DefaultProps.defaultFilter,
  icon, handleClickIcon, cardStyles
}: Props) {
  const dispatch = useAppDispatch();
  const username = useAppSelector(state => state.auth.username);

  // 상태 초기화
  useLayoutEffect(() => {
    if (resetOnMount) dispatch(initialize());
  }, []);

  // 자신의 소유권만 보여줘야 할 경우 렌더시 자신의 아이디를 검색 필터에 추가
  const initFilter = useCallback(() => {
    if (defaultFilter.owner === 'MINE') dispatch(addKeyword({ type: 'USER_NAME', value: username }));
  }, [dispatch, defaultFilter, username]);
  useEffect(() => {
    initFilter();
  }, [defaultFilter]);

  // 검색 필터 키워드 추가
  const handleAddKeyword = useCallback((type: string, value: string) => {
    dispatch(addKeyword({
      type: type as SearchKeywordsType,
      value: value
    }))
  }, [dispatch]);

  return (
    <Card styles={cardStyles}>
      <CardHeader styles={{ padding: "0", borderBottom: "0" }}>
        {defaultFilter.owner === 'ALL' && <SearchInput keywords={SearchKeywords} handleAddKeyword={handleAddKeyword} />}
        <SearchLabelList defaultFilter={defaultFilter} />
      </CardHeader>
      <CardBody>
        <FilterCheck resetOnMount={resetOnMount} defaultFilter={defaultFilter} />
        <VoucherList defaultFilter={defaultFilter} icon={icon} handleClickIcon={handleClickIcon} />
      </CardBody>
    </Card>
  );
}

export default VoucherListCard;