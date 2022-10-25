import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { useAppSelector, useAppDispatch } from '@app/redux/reduxHooks';
import Select from '@component/form/Select';
import SearchBar from '@component/searchbar/SearchBar';
import CardHeader from '@component/card/basic/CardHeader';
import { addName, addUsername } from '../voucherListSlice';

interface SearchInputProps {
  children?: React.ReactNode;
}
const SearchInputDefaultProps = {};

function SearchInput({ children }: SearchInputProps & typeof SearchInputDefaultProps) {
  const dispatch = useAppDispatch();
  const [input, setInput] = useState('');
  const [searchSelect, setSearchSelect] = useState<'PHOTO_NAME' | 'USER_NAME'>('PHOTO_NAME'); // 검색 타입

  // 검색 타입 값 변경
  const changeSelect = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === 'PHOTO_NAME' || value === 'USER_NAME') setSearchSelect(value);
  }, []);

  // 검색 인풋 값 변경
  const changeInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }, []);

  // 검색 키워드 추가
  const handleAddKeyword = useCallback(() => {
    if (searchSelect === 'PHOTO_NAME') dispatch(addName(input));
    else if (searchSelect === 'USER_NAME') dispatch(addUsername(input));
    setInput('');
  }, [input, dispatch, searchSelect]);

  return (
    <CardHeader className="search-bar-section">
      <Select
        styles={{
          width: "10em",
          height: "3em",
        }}
        onChange={changeSelect}
      >
        <option value="PHOTO_NAME">포토카드 이름</option>
        <option value="USER_NAME">사용자 아이디</option>
      </Select>
      <SearchBar
        type="text"
        name="search"
        value={input}
        placeholder="키워드로 검색"
        handleInputChange={changeInput}
        handleSubmit={handleAddKeyword}
        styles={{
          width: "100%"
        }}
      >
      </SearchBar>
    </CardHeader>
  );
}

SearchInput.defaultProps = SearchInputDefaultProps;
export default SearchInput;