import { CategoryType } from '@component/search/content/keyword/reducer';
import Search from '@component/search/content/search/Search';
import { FilterSection } from '@component/search/content/filter/content/_styles';
import { KeywordSection } from '@component/search/content/keyword/content/_styles';
import GroupFilter from '@component/search/content/filter/GroupFilter';
import MemberFilter from '@component/search/content/filter/MemberFilter';
import RadioFilter from '@component/search/content/filter/RadioFilter';
import GroupKeywords from '@component/search/content/keyword/GroupKeywords';
import MemberKeywords from '@component/search/content/keyword/MemberKeywords';
import RadioKeywords from './content/keyword/RadioKeywords';
import Keywords from '@component/search/content/keyword/Keywords';
import { SearcherHook } from './hook/useSearcher';

interface Props {
  hook: SearcherHook;
  category?: CategoryType;
  options?: {
    // 어떤 데이터에 대한 필터를 보여줄 것인지를 지정한다.
    group?: boolean; // 그룹
    member?: boolean; // 멤버
    voucherState?: boolean; // 소유권 상태
    shippingState?: boolean; // 배송 상태
    paymentState?: boolean; // 결제 상태
  };
}

function Searcher(props: Props) {
  const { category = {}, options = {}, hook } = props;
  const { filter, keyword, filterDispatch, keywordDispatch } = hook;

  return (
    <>
      <Search category={category} state={keyword} dispatch={keywordDispatch} />
      <FilterSection marginBottom="1em">
        <GroupFilter show={options.group || false} state={filter} dispatch={filterDispatch} />
        <MemberFilter show={options.member || false} state={filter} dispatch={filterDispatch} />
        {options.voucherState && <RadioFilter target="voucher" state={filter} dispatch={filterDispatch} />}
        {options.shippingState && <RadioFilter target="shipping" state={filter} dispatch={filterDispatch} />}
        {options.paymentState && <RadioFilter target="payment" state={filter} dispatch={filterDispatch} />}
      </FilterSection>
      <KeywordSection marginBottom="1em">
        {options.group && <GroupKeywords state={filter} dispatch={filterDispatch} />}
        {options.member && <MemberKeywords state={filter} dispatch={filterDispatch} />}
        {options.voucherState && <RadioKeywords target="voucher" state={filter} dispatch={filterDispatch} />}
        {options.shippingState && <RadioKeywords target="shipping" state={filter} dispatch={filterDispatch} />}
        {options.paymentState && <RadioKeywords target="payment" state={filter} dispatch={filterDispatch} />}
        <Keywords state={keyword} dispatch={keywordDispatch} />
      </KeywordSection>
    </>
  );
}

export default Searcher;
