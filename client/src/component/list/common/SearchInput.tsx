import React, { useState, useCallback } from 'react';
import Select from '@component/form/Select';
import SearchBar from '@component/searchbar/SearchBar';
import CardHeader from '@component/card/basic/CardHeader';

interface Props {
  keywords?: { [name: string]: string; };
  handleAddKeyword?: (type: string, value: string) => void;
  children?: React.ReactNode;
}
const DefaultProps = {
  keywords: { 'DEFAULT': '키워드' },
  handleAddKeyword: (type: string, value: string) => {}
};

function SearchInput({
  keywords = DefaultProps.keywords,
  handleAddKeyword = DefaultProps.handleAddKeyword,
  children
}: Props) {
  const keywordsEntries = Object.entries(keywords);
  const [input, setInput] = useState('');
  const [select, setSelect] = useState(keywordsEntries[0][0]);

  // 검색 타입 값 변경
  const changeSelect = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (keywords[value]) setSelect(value);
  }, [keywords]);

  // 검색 인풋 값 변경
  const changeInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }, []);

  // 검색 키워드 추가
  const onSubmit = useCallback(() => {
    const value = input.trim();
    if (!value) return;
    handleAddKeyword(select, value);
    setInput('');
  }, [select, input, handleAddKeyword]);

  return (
    <CardHeader className="search-bar-section">
      {keywordsEntries.length > 1 &&
      <Select
        styles={{
          width: "10em",
          height: "3em",
        }}
        onChange={changeSelect}
      >
        {keywordsEntries.map((item, idx) => <option key={idx} value={item[0]}>{item[1]}</option>)}
      </Select>}
      <SearchBar
        type="text"
        name="search"
        value={input}
        placeholder={`${keywords[select]}(으)로 검색`}
        handleInputChange={changeInput}
        handleSubmit={onSubmit}
        styles={{
          width: "100%"
        }}
      >
      </SearchBar>
    </CardHeader>
  );
}

export default SearchInput;