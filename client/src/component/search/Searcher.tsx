import React from 'react';
import {
  State as FilterState,
  Action as FilterAction
} from '@component/search/content/filter/reducer';
import {
  CategoryType,
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

interface Props {
  category?: CategoryType;
  options?: { // 어떤 데이터에 대한 필터를 보여줄 것인지를 지정한다.
    group?: boolean; // 그룹
    member?: boolean; // 멤버
    voucherState?: boolean; // 소유권 상태
  }
  filter: FilterState;
  keyword: KeywordState;
  filterDispatch: React.Dispatch<FilterAction>;
  keywordDispatch: React.Dispatch<KeywordAction>;
}

function Searcher({ category = {}, options = {}, filter, keyword, filterDispatch, keywordDispatch }: Props) {
  return (
    <>
      <Search category={category} state={keyword} dispatch={keywordDispatch} />
      <FilterSection marginBottom="1em">
        <GroupFilter show={options.group || false} state={filter} dispatch={filterDispatch} />
        <MemberFilter show={options.member || false} state={filter} dispatch={filterDispatch} />
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