import React from 'react';
import styled from 'styled-components';

interface Props {
  styles?: StylesProps;
  children?: React.ReactNode;
}
const DefaultProps = {};
function InputMessage({ styles, children }: Props) {
  return (
    <StyledLabel {...styles}>
      {children}
    </StyledLabel>
  );
}

export default InputMessage;

// 스타일 컴포넌트
interface StylesProps {
  margin?: string;
  marginTop?: string;
  marginBottom?: string;
  marginLeft?: string;
  marginRight?: string;
  width?: string;
  textAlign?: string;
  wordBreak?: string;
}
const StyledLabel = styled.p<StylesProps>`
  margin: ${p => p.margin};
  margin-top: ${p => p.marginTop};
  margin-bottom: ${p => p.marginBottom};
  margin-left: ${p => p.marginLeft};
  margin-right: ${p => p.marginRight};
  width: ${p => p.width};
  text-align: ${p => p.textAlign};
  color: red;
  word-break: ${p => p.wordBreak};
`;