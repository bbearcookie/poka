import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import Input from './Input';
import Button from './Button';

const CLASS = 'SearchBar';
interface SearchBarProps {
  type: React.HTMLInputTypeAttribute;
  name: string;
  height?: string;
  value?: any;
  autoComplete?: string;
  maxLength?: number;
  placeholder?: string;
  handleInputChange?: React.ChangeEventHandler<HTMLInputElement>;
  onSubmit?: React.FormEventHandler;
  children?: React.ReactNode;
}
const SearchBarDefaultProps = {
  height: '3em',
  autoComplete: 'off',
  onSubmit: (e: React.FormEvent) => { e.preventDefault(); }
};

function SearchBar(p: SearchBarProps & typeof SearchBarDefaultProps) {
  const [active, setActive] = useState(false);

  return (
    <StyledSearchBar 
      {...p}
      className={classNames(CLASS, {"active": active})}
      onSubmit={p.onSubmit}
    >
      <Input
        type={p.type}
        name={p.name}
        value={p.value}
        placeholder={p.placeholder}
        maxLength={p.maxLength}
        autoComplete={p.autoComplete}
        onChange={p.handleInputChange}
        onFocus={(e) => setActive(true)}
        onBlur={(e) => setActive(false)}
      />
      {p.children}
      <Button />
    </StyledSearchBar>
  );
}

SearchBar.defaultProps = SearchBarDefaultProps;
export default SearchBar;

// 스타일 컴포넌트
const StyledSearchBar = styled.form<SearchBarProps>`
  height: ${p => p.height};
  display: flex;
  align-items: center;
  border-radius: 10px;
`;