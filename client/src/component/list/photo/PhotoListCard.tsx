import React, { useLayoutEffect, useCallback } from 'react';
import { useAppDispatch } from '@app/redux/reduxHooks';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import Card, { StylesProps as CardStyle } from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardBody from '@component/card/basic/CardBody';
import SearchInput from '@component/list/common/SearchInput';
import SearchLabelList from './content/SearchLabelList';
import FilterCheck from './content/FilterCheck';
import PhotoList from './content/PhotoList';
import { initialize, addName } from './photoListCardSlice';
import './PhotoListCard.scss';

interface Props {
  resetOnMount?: boolean; // 컴포넌트가 렌더링될 때 상태값을 초기 상태로 리셋할지의 여부
  icon?: IconDefinition;
  handleClickIcon?: (photocardId: number) => void;
  cardStyles?: CardStyle;
}
const DefaultProps = {
  resetOnMount: false,
};

function PhotoListCard({ resetOnMount = DefaultProps.resetOnMount, icon, handleClickIcon, cardStyles }: Props) {
  const dispatch = useAppDispatch();

  // 상태 초기화
  useLayoutEffect(() => {
    if (resetOnMount) dispatch(initialize());
  }, []);

  // 검색 필터 키워드 추가
  const handleAddKeyword = useCallback((type: string, value: string) => {
    dispatch(addName(value));
  }, [dispatch]);

  return (
    <Card styles={cardStyles}>
      <CardHeader styles={{ padding: "0", borderBottom: "0" }}>
        <SearchInput keywords={{ "PHOTO_NAME": "포토카드 이름" }} handleAddKeyword={handleAddKeyword} />
        <SearchLabelList />
      </CardHeader>
      <CardBody>
        <FilterCheck resetOnMount={resetOnMount} />
        <PhotoList icon={icon} handleClickIcon={handleClickIcon} />
      </CardBody>
    </Card>
  );
}

export default PhotoListCard;