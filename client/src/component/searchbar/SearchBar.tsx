import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import Input from './Input';
import Button from './Button';

export interface CommonSearchBarProps {
  type: React.HTMLInputTypeAttribute;
  name: string;
  value?: any;
  autoComplete?: string;
  maxLength?: number;
  placeholder?: string;
  handleInputChange?: React.ChangeEventHandler<HTMLInputElement>;
  handleSubmit?: () => void;
}

interface SearchBarProps extends CommonSearchBarProps {
  styles?: StylesProps;
  children?: React.ReactNode;
}
const SearchBarDefaultProps = {
  autoComplete: 'off',
};
function SearchBar(p: SearchBarProps & typeof SearchBarDefaultProps) {
  const [active, setActive] = useState(false);

  return (
    <StyledSearchBar 
      {...StylesDefaultProps} {...p.styles} {...p}
      className={classNames("SearchBar", {"active": active})}
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
        onKeyDown={(e) => e.key === 'Enter' && p.handleSubmit && p.handleSubmit()}
      />
      {p.children}
      <Button onClick={p.handleSubmit} />
    </StyledSearchBar>
  );
}

SearchBar.defaultProps = SearchBarDefaultProps;
export default SearchBar;

// 스타일 컴포넌트
interface StylesProps {
  width?: string;
  height?: string;
}
const StylesDefaultProps = {
  height: '3em',
};
const StyledSearchBar = styled.div<StylesProps & typeof StylesDefaultProps>`
  width: ${p => p.width};
  height: ${p => p.height};
  display: flex;
  align-items: center;
  border-radius: 10px;
`;