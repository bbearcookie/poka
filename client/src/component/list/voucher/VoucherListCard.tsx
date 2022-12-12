import React, { useEffect, useCallback } from 'react';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { useAppDispatch, useAppSelector } from '@app/redux/reduxHooks';
import Card, { StylesProps as CardStyle } from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardBody from '@component/card/basic/CardBody';
import SearchInput from '@component/list/common/SearchInput';
import SearchLabelList from './content/SearchLabelList';
import FilterCheck from './content/FilterCheck';
import VoucherList from './content/VoucherList';
import { initialize, addUsername, VoucherStateType, SearchKeywords, addKeyword, SearchKeywordsType } from './voucherListSlice';
import '../photo/PhotoListCard.scss';

// 검색 필터에 기본적으로 적용할 값. 기본 값이 있으면 그 값에 대한 필터 변경은 불가능함.
export type DefaultFilterType = {
  owner: 'ALL' | 'MINE'; // (ALL) 모든 사용자의 소유권 출력 (MINE) 자신의 소유권만 출력
  state: VoucherStateType; // 특정 상태의 소유권만 보여주도록 지정
}

interface VoucherListCardProps {
  defaultFilter?: DefaultFilterType;
  icon?: IconDefinition;
  handleClickIcon?: (voucherId: number) => void;
  cardStyles?: CardStyle;
  children?: React.ReactNode;
}
const VoucherListCardDefaultProps = {
  defaultFilter: {
    owner: 'ALL',
    state: 'ALL'
  }
};

function VoucherListCard({ defaultFilter, icon, handleClickIcon, cardStyles, children }: VoucherListCardProps & typeof VoucherListCardDefaultProps) {
  const dispatch = useAppDispatch();
  const username = useAppSelector(state => state.auth.username);

  // 자신의 소유권만 보여줘야 할 경우 렌더시 자신의 아이디를 검색 필터에 추가
  const initFilter = useCallback(() => {
    if (defaultFilter.owner === 'MINE') dispatch(addUsername(username));
  }, [dispatch, defaultFilter, username]);
  useEffect(() => {
    initFilter();
    // 언마운트시 리덕스 상태 초기화
    return () => { dispatch(initialize()); }
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
        <FilterCheck defaultFilter={defaultFilter} />
        <VoucherList defaultFilter={defaultFilter} icon={icon} handleClickIcon={handleClickIcon} />
      </CardBody>
    </Card>
  );
}

VoucherListCard.defaultProps = VoucherListCardDefaultProps;
export default VoucherListCard;