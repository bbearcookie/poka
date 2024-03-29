import React, { useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Select from '@component/form/select/Select';
import { SearchSection, StyledInput, StyledButton, StyledSearchBar } from './content/_styles';
import { State, Action, CategoryType } from '@component/search/content/keyword/reducer';

interface Props {
  category: CategoryType;
  state: State;
  dispatch: React.Dispatch<Action>;
}

function Search({ category, state, dispatch }: Props) {
  const categories = Object.entries(category) as [keyof CategoryType, any][];
  const [input, setInput] = useState('');
  const [select, setSelect] = useState<keyof CategoryType>(
    categories.length > 0 ? categories[0][0] : 'undefined'
  );

  // 검색 타입 선택 변경
  const changeSelect = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as keyof CategoryType;
    setSelect(value);
  }, []);

  // 검색 키워드 값 변경
  const changeInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }, []);

  // 키워드 추가
  const addKeyword = useCallback(() => {
    dispatch({
      type: 'ADD_KEYWORD',
      value: {
        category: select,
        title: category[select] || '',
        value: input,
        show: true,
      },
    });

    setInput('');
  }, [category, select, input, dispatch]);

  if (categories.length === 0) return <></>;
  else
    return (
      <SearchSection marginBottom="1em">
        {categories.length > 1 && (
          <Select value={select} onChange={changeSelect} css={{ width: '10em', height: '3em' }}>
            {categories.map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </Select>
        )}

        <StyledSearchBar>
          <StyledInput
            type="text"
            name="search"
            value={input}
            autoComplete="off"
            placeholder={`${category[select]}(으)로 검색`}
            onChange={changeInput}
            onKeyDown={e => {
              if (e.key === 'Enter') addKeyword();
            }}
          />
          <StyledButton type="button" onClick={addKeyword}>
            <FontAwesomeIcon className="icon" icon={faSearch} size="lg" />
          </StyledButton>
        </StyledSearchBar>
      </SearchSection>
    );
}

export default Search;
