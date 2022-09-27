import React from 'react';
import SearchBar from '@component/searchbar/SearchBar';
import CardHeader from '@component/card/basic/CardHeader';

interface SearchInputProps {
  children?: React.ReactNode;
}
const SearchInputDefaultProps = {};

function SearchInput({ children }: SearchInputProps & typeof SearchInputDefaultProps) {
  return (
    <CardHeader>
      <SearchBar
        type="text"
        name="search"
        placeholder="포토카드 이름으로 검색"
      />
    </CardHeader>
  );
}

SearchInput.defaultProps = SearchInputDefaultProps;
export default SearchInput;