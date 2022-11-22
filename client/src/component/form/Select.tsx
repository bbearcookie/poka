import React from 'react';
import styled from 'styled-components';

interface SelectProps {
  name?: string;
  value?: string | number | readonly string[] | undefined;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  styles?: StylesProps;
  children?: React.ReactNode;
}
const SelectDefaultProps = {};
function Select({ name, value, onChange, styles, children }: SelectProps & typeof SelectDefaultProps) {
  return (
    <StyledSelect
      {...StylesDefaultProps} {...styles}
      className="Select"
      name={name}
      value={value}
      onChange={onChange}
    >
      {children}
    </StyledSelect>
  );
}

Select.defaultProps = SelectDefaultProps;
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
const StylesDefaultProps = {
  borderRadius: '5px',
  paddingLeft: '0.5em',
  paddingRight: '0.5em'
};
const StyledSelect = styled.select<StylesProps & typeof StylesDefaultProps>`
  width: ${p => p.width};
  height: ${p => p.height};
  padding-top: ${p => p.paddingTop};
  padding-bottom: ${p => p.paddingBottom};
  padding-left: ${p => p.paddingLeft};
  padding-right: ${p => p.paddingRight};
  margin: ${p => p.margin};
  margin-top: ${p => p.marginTop};
  margin-bottom: ${p => p.marginBottom};
  margin-left: ${p => p.marginLeft};
  margin-right: ${p => p.marginRight};
  font-size: 1rem;
  font-family: inherit;
  border: 1px solid hsl(222, 9%, 78%);
  border-radius: ${p => p.borderRadius};

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