import React, { useReducer, useCallback } from 'react';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import Card, { StylesProps as CardStyle } from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardBody from '@component/card/basic/CardBody';
import SearchInput from '@component/list/common/SearchInput';
import SearchLabelList from './content/SearchLabelList';
import FilterCheck from './content/FilterCheck';
import PhotoList from './content/PhotoList';
import reducer, { initialState } from './reducer';
import './PhotoListCard.scss';

interface Props {
  icon?: IconDefinition;
  handleClickIcon?: (photocardId: number) => void;
  cardStyles?: CardStyle;
}

function PhotoListCard({ icon, handleClickIcon, cardStyles }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // 검색 필터 키워드 추가
  const addKeyword = useCallback((type: string, value: string) => {
    dispatch({ type: "ADD_NAME", payload: value });
  }, [dispatch]);

  return (
    <Card styles={cardStyles}>
      <CardHeader styles={{ padding: "0", borderBottom: "0" }}>
        <SearchInput keywords={{ "PHOTO_NAME": "포토카드 이름" }} addKeyword={addKeyword} />
        <SearchLabelList state={state} dispatch={dispatch} />
      </CardHeader>
      <CardBody>
        <FilterCheck state={state} dispatch={dispatch} />
        <PhotoList state={state} dispatch={dispatch} icon={icon} handleClickIcon={handleClickIcon} />
      </CardBody>
    </Card>
  );
}

export default PhotoListCard;