import React, { useState, useCallback } from 'react';
import CardHeader from '@component/card/basic/CardHeader';
import SearchBar from '@component/searchbar/SearchBar';
import Select from '@component/form/Select';

interface SearchProps {
  children?: React.ReactNode;
}
const SearchDefaultProps = {};

function Search({ children }: SearchProps & typeof SearchDefaultProps) {
  const [input, setInput] = useState('');
  const [select, setSelect] = useState('');

  // 검색 인풋 값 변경
  const changeInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }, []);

  // 검색
  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    console.log(input);
    setInput('');
  }, [input]);

  return (
    <>
      <CardHeader>
        <SearchBar
          type="text"
          name="search"
          value={input}
          placeholder="포토카드 이름으로 검색"
          handleInputChange={changeInput}
          onSubmit={handleSearch}
        />
        {/* <section className="search-bar-section">
          <SearchBar />
          <Select height="3em">
            <option>포토카드 이름</option>
            <option>ㅎㅎ</option>
            <option>ㅁㅁ</option>
          </Select>
        </section> */}
      </CardHeader>
      <CardHeader>
        라벨 컴포넌트. overflow-x를 auto로 준다.
      </CardHeader>
    </>
  );
}

Search.defaultProps = SearchDefaultProps;
export default Search;