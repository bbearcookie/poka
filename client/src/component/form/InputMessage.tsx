import React from 'react';
import styled from 'styled-components';

interface InputMessageProps {
  styles?: StylesProps;
  children?: React.ReactNode;
}
const InputMessageDefaultProps = {};
function InputMessage({ styles, children}: InputMessageProps & typeof InputMessageDefaultProps) {
  return (
    <StyledLabel {...styles}>
      {children}
    </StyledLabel>
  );
}

InputMessage.defaultProps = InputMessageDefaultProps;
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