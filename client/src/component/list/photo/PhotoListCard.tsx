import React, { useCallback } from 'react';
import { useAppDispatch } from '@app/redux/reduxHooks';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import Card, { StylesProps as CardStyle } from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardBody from '@component/card/basic/CardBody';
import SearchInput from '@component/list/common/SearchInput';
import SearchLabelList from './content/SearchLabelList';
import FilterCheck from './content/FilterCheck';
import PhotoList from './content/PhotoList';
import { addName } from './photoListCardSlice';
import './PhotoListCard.scss';

interface PhotoListCardProps {
  icon?: IconDefinition;
  handleClickIcon?: (photocardId: number) => void;
  cardStyles?: CardStyle;
  children?: React.ReactNode;
}
const PhotoListCardDefaultProps = {};

function PhotoListCard({ icon, handleClickIcon, cardStyles, children }: PhotoListCardProps & typeof PhotoListCardDefaultProps) {
  const dispatch = useAppDispatch();

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
        <FilterCheck />
        <PhotoList icon={icon} handleClickIcon={handleClickIcon} />
      </CardBody>
    </Card>
  );
}

PhotoListCard.defaultProps = PhotoListCardDefaultProps;
export default PhotoListCard;