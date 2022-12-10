import React, { useState, useCallback } from 'react';
import { useAppDispatch } from '@app/redux/reduxHooks';
import SearchBar from '@component/searchbar/SearchBar';
import CardHeader from '@component/card/basic/CardHeader';
import { addName } from '../photoListCardSlice';

interface SearchInputProps {
  children?: React.ReactNode;
}
const SearchInputDefaultProps = {};

function SearchInput({ children }: SearchInputProps & typeof SearchInputDefaultProps) {
  const [input, setInput] = useState('');
  const dispatch = useAppDispatch();

  // 검색 인풋 값 변경
  const changeInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }, []);

  // 검색 키워드 추가
  const handleAddKeyword = useCallback(() => {
    dispatch(addName(input));
    setInput('');
  }, [input, dispatch]);

  return (
    <CardHeader>
      <SearchBar
        type="text"
        name="search"
        value={input}
        placeholder="포토카드 이름으로 검색"
        handleInputChange={changeInput}
        handleSubmit={handleAddKeyword}
      />
    </CardHeader>
  );
}

SearchInput.defaultProps = SearchInputDefaultProps;
export default SearchInput;