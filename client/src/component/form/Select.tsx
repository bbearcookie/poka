import React from 'react';
import styled from 'styled-components';

interface Props {
  name?: string;
  value?: string | number | readonly string[] | undefined;
  defaultValue?: string | number | readonly string[] | undefined;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  styles?: StylesProps;
  children?: React.ReactNode;
}
const DefaultProps = {};
function Select({ name, value, defaultValue, onChange, styles, children }: Props) {
  return (
    <StyledSelect
      className="Select"
      name={name}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      {...styles}
    >
      {children}
    </StyledSelect>
  );
}

export default Select;

// 스타일 컴포넌트
interface StylesProps {
  width?: string;
  height?: string;
  paddingTop?: string;
  paddingBottom?: string;
  paddingLeft?: string;
  paddingRight?: string;
  margin?: string;
  marginTop?: string;
  marginBottom?: string;
  marginLeft?: string;
  marginRight?: string;
  borderRadius?: string;
  textAlign?: string;
}
const StyledSelect = styled.select<StylesProps>`
  width: ${p => p.width};
  height: ${p => p.height};
  padding-top: ${p => p.paddingTop};
  padding-bottom: ${p => p.paddingBottom};
  padding-left: ${p => p.paddingLeft ? p.paddingLeft : '0.5em'};
  padding-right: ${p => p.paddingRight ? p.paddingRight : '0.5em'};
  margin: ${p => p.margin};
  margin-top: ${p => p.marginTop};
  margin-bottom: ${p => p.marginBottom};
  margin-left: ${p => p.marginLeft};
  margin-right: ${p => p.marginRight};
  font-size: 1rem;
  font-family: inherit;
  border: 1px solid hsl(222, 9%, 78%);
  border-radius: ${p => p.borderRadius ? p.borderRadius : '5px'};

  // 화살표 디자인 변경
  /* background: url("data:image/svg+xml,<svg height='10px' width='10px' viewBox='0 0 16 16' fill='%23000000' xmlns='http://www.w3.org/2000/svg'><path d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/></svg>") no-repeat;
  background-position: calc(100% - ${p => p.paddingRight});
  -moz-appearance: none;
  -webkit-appearance: none; 
  appearance: none; */

  &:focus {
    outline: none;
    border: 1px solid rgb(206, 28, 73);
    box-shadow: 0px 0px 1px 1px rgb(206, 28, 73);
    transition: all 0.25s;
  }
`;