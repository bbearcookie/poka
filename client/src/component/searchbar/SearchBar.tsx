import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import Input from './Input';
import Button from './Button';

const CLASS = 'SearchBar';
interface SearchBarProps {
  type: React.HTMLInputTypeAttribute;
  name: string;
  value?: any;
  autoComplete?: string;
  maxLength?: number;
  placeholder?: string;
  handleInputChange?: React.ChangeEventHandler<HTMLInputElement>;
  onSubmit?: React.FormEventHandler;
  styles?: StylesProps;
  children?: React.ReactNode;
}
const SearchBarDefaultProps = {
  autoComplete: 'off',
  onSubmit: (e: React.FormEvent) => { e.preventDefault(); }
};
function SearchBar(p: SearchBarProps & typeof SearchBarDefaultProps) {
  const [active, setActive] = useState(false);

  return (
    <StyledSearchBar 
      {...StylesDefaultProps} {...p.styles} {...p}
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
interface StylesProps {
  height?: string;
}
const StylesDefaultProps = {
  height: '3em',
};
const StyledSearchBar = styled.form<StylesProps & typeof StylesDefaultProps>`
  height: ${p => p.height};
  display: flex;
  align-items: center;
  border-radius: 10px;
`;