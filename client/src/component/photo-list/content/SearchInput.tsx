import React, { useState, useCallback } from 'react';
import { useAppSelector, useAppDispatch } from '@app/reduxHooks';
import { addLabel } from './searchSlice';
import SearchBar from '@component/searchbar/SearchBar';
import CardHeader from '@component/card/basic/CardHeader';

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
  const handleSearch = useCallback(() => {
    if (!input) return;
    
    dispatch(addLabel({
      text: input,
      data: {
        type: 'PHOTO_NAME',
        value: input
      }
    }));
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
        handleAddKeyword={handleSearch}
      />
    </CardHeader>
  );
}

SearchInput.defaultProps = SearchInputDefaultProps;
export default SearchInput;