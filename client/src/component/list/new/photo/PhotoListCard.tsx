import React, { useReducer } from 'react';
import {
  reducer as filterReducer,
  initialState as filterInitialState
} from '@component/list/new/filter/reducer';
import {
  reducer as keywordReducer,
  initialState as keywordInitialState
} from '@component/list/new/keyword/reducer';
import GroupFilter from '@component/list/new/filter/GroupFilter';
import MemberFilter from '@component/list/new/filter/MemberFilter';
import GroupKeywords from '../keyword/GroupKeywords';
import MemberKeywords from '../keyword/MemberKeywords';
import Keywords from '../keyword/Keywords';
import Search from '../search/Search';
import { FilterSection } from '@component/list/new/filter/content/_styles';
import { KeywordSection } from '../keyword/content/_styles';

interface Props {}

const category = {
  photoname: "포토카드",
  username: "아이디"
}

function PhotoListCard({  }: Props) {
  const [filter, filterDispatch] = useReducer(filterReducer, filterInitialState);
  const [keyword, keywordDispatch] = useReducer(keywordReducer, keywordInitialState);

  return (
    <div>
      <Search category={category} state={keyword} dispatch={keywordDispatch} />
      <FilterSection marginBottom="1em">
        <GroupFilter state={filter} dispatch={filterDispatch} />
        <MemberFilter state={filter} dispatch={filterDispatch} />
      </FilterSection>
      <KeywordSection>
        <GroupKeywords state={filter} dispatch={filterDispatch} />
        <MemberKeywords state={filter} dispatch={filterDispatch} />
        <Keywords state={keyword} dispatch={keywordDispatch} />
      </KeywordSection>
    </div>
  );
}

export default PhotoListCard;