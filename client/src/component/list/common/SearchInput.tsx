import React, { useState, useCallback } from 'react';
import Select from '@component/form/Select';
import SearchBar from '@component/searchbar/SearchBar';
import CardHeader from '@component/card/basic/CardHeader';

interface Props {
  keywords?: { [name: string]: string; };
  addKeyword?: (type: string, value: string) => void;
}
const DefaultProps = {
  keywords: { 'DEFAULT': '키워드' },
  addKeyword: (type: string, value: string) => {}
};

function SearchInput({
  keywords = DefaultProps.keywords,
  addKeyword = DefaultProps.addKeyword
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
    addKeyword(select, value);
    setInput('');
  }, [select, input, addKeyword]);

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
        inputProps={{
          type: "text",
          name: "search",
          value: input,
          autoComplete: "off",
          placeholder: `${keywords[select]}(으)로 검색`,
        }}
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