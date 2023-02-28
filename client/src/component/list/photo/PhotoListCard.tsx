import React, { useReducer, useCallback } from 'react';
import { IconType } from '@type/icon';
import Card, { StylesProps as CardStyle } from '@component/card/basic/Card';
import { SearchSection } from '@component/list/common/Styles';
import CardBody from '@component/card/basic/CardBody';
import SearchInput from '@component/list/common/searchbar/SearchInput';
import SearchLabelList from './content/SearchLabelList';
import FilterList from './content/FilterList';
import PhotoList from './content/PhotoList';
import reducer, { initialState } from './reducer';

interface Props {
  icon?: IconType;
  handleSelect?: (photocardId: number) => void;
  cardStyles?: CardStyle;
}

function PhotoListCard({ icon, handleSelect, cardStyles }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // 검색 필터 키워드 추가
  const addKeyword = useCallback((type: string, value: string) => {
    dispatch({ type: "ADD_NAME", payload: value });
  }, [dispatch]);

  return (
    <Card styles={cardStyles}>
      <SearchSection>
        <SearchInput keywords={{ "PHOTO_NAME": "포토카드 이름" }} addKeyword={addKeyword} />
        <SearchLabelList state={state} dispatch={dispatch} />
        <FilterList state={state} dispatch={dispatch} />
      </SearchSection>
      <CardBody>
        <PhotoList state={state} dispatch={dispatch} icon={icon} handleSelect={handleSelect} />
      </CardBody>
    </Card>
  );
}

export default PhotoListCard;