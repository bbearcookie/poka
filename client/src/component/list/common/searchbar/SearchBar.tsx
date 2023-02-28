import React, { useState, useCallback } from 'react';
import { Props as InputProps } from '@component/list/common/searchbar/content/Input';
import styled from 'styled-components';
import classNames from 'classnames';
import Input from './content/Input';
import Button from './content/Button';

interface Props {
  inputProps: InputProps;
  handleInputChange?: React.ChangeEventHandler<HTMLInputElement>;
  handleSubmit?: () => void;
  styles?: StylesProps;
  children?: React.ReactNode;
}

function SearchBar({ inputProps, handleInputChange, handleSubmit, styles, children }: Props) {
  const [active, setActive] = useState(false);

  // 엔터 입력시 submit 동작
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!handleSubmit) return;

    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  }, [handleSubmit]);

  return (
    <StyledSearchBar
      className={classNames({"active": active})}
      {...styles}
    >
      <Input
        {...inputProps}
        onFocus={(e) => setActive(true)}
        onBlur={(e) => setActive(false)}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      {children}
      <Button onClick={handleSubmit} />
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