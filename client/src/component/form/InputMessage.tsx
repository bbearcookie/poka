import React from 'react';
import styled from 'styled-components';

interface InputMessageProps {
  styles?: StylesProps;
  children?: React.ReactNode;
}
const InputMessageDefaultProps = {};
function InputMessage(p: InputMessageProps & typeof InputMessageDefaultProps) {
  return (
    <StyledLabel {...StylesDefaultProps} {...p.styles} {...p}>
      {p.children}
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
const StylesDefaultProps = {};
const StyledLabel = styled.p<StylesProps & typeof StylesDefaultProps>`
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