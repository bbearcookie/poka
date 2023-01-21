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

interface Props extends CommonSearchBarProps {
  styles?: StylesProps;
  children?: React.ReactNode;
}
const DefaultProps = {
  autoComplete: 'off',
};
function SearchBar(p: Props & typeof DefaultProps) {
  const [active, setActive] = useState(false);

  // 엔터 입력시 submit 동작
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!p.handleSubmit) return;
    if (e.key === 'Enter') {
      e.preventDefault();
      p.handleSubmit();
    }
  }, [p]);

  return (
    <StyledSearchBar
      className={classNames("SearchBar", {"active": active})}
      {...p.styles} {...p}
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
        onKeyDown={handleKeyDown}
      />
      {p.children}
      <Button onClick={p.handleSubmit} />
    </StyledSearchBar>
  );
}

export default SearchBar;

// 스타일 컴포넌트
interface StylesProps {
  width?: string;
  height?: string;
}
const StyledSearchBar = styled.div<StylesProps>`
  width: ${p => p.width};
  height: ${p => p.height ? p.height : '3em'};
  display: flex;
  align-items: center;
  border-radius: 10px;
`;