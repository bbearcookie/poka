import React from 'react';
import {
  State as FilterState,
  Action as FilterAction
} from '@component/search/content/filter/reducer';
import {
  State as KeywordState,
  Action as KeywordAction
} from '@component/search/content/keyword/reducer';
import Search from '@component/search/content/search/Search';
import { FilterSection } from '@component/search/content/filter/content/_styles';
import { KeywordSection } from '@component/search/content/keyword/content/_styles';
import GroupFilter from '@component/search/content/filter/GroupFilter';
import MemberFilter from '@component/search/content/filter/MemberFilter';
import VoucherStateFilter from '@component/search/content/filter/VoucherStateFilter';
import GroupKeywords from '@component/search/content/keyword/GroupKeywords';
import MemberKeywords from '@component/search/content/keyword/MemberKeywords';
import VoucherStateKeywords from './content/keyword/VoucherStateKeywords';
import Keywords from '@component/search/content/keyword/Keywords';

// 어떤 데이터에 대한 필터를 보여줄 것인지를 지정한다.
export interface OptionType {
  group?: boolean; // 그룹
  member?: boolean; // 멤버
  voucherState?: boolean; // 소유권 상태
}

interface Props {
  category?: { [type: string]: string; } // 검색 타입의 키워드와, 라벨에 보여줄 텍스트 지정
  options: OptionType;
  filter: FilterState;
  keyword: KeywordState;
  filterDispatch: React.Dispatch<FilterAction>;
  keywordDispatch: React.Dispatch<KeywordAction>;
}

function Searcher({ category = {}, options, filter, keyword, filterDispatch, keywordDispatch }: Props) {
  return (
    <>
      <Search category={category} state={keyword} dispatch={keywordDispatch} />
      <FilterSection marginBottom="1em">
        {options.group && <GroupFilter state={filter} dispatch={filterDispatch} />}
        {options.member && <MemberFilter state={filter} dispatch={filterDispatch} />}
        {options.voucherState && <VoucherStateFilter state={filter} dispatch={filterDispatch} />}
      </FilterSection>
      <KeywordSection marginBottom="1em">
        {options.group && <GroupKeywords state={filter} dispatch={filterDispatch} />}
        {options.member && <MemberKeywords state={filter} dispatch={filterDispatch} />}
        {options.voucherState && <VoucherStateKeywords state={filter} dispatch={filterDispatch} />}
        <Keywords state={keyword} dispatch={keywordDispatch} />
      </KeywordSection>
    </>
  );
}

export default Searcher;