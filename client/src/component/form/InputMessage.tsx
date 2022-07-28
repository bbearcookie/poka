import React from 'react';
import styled from 'styled-components';

interface InputMessageProps {
  margin?: string;
  marginTop?: string;
  marginBottom?: string;
  marginLeft?: string;
  marginRight?: string;
  width?: string;
  textAlign?: string;
  children?: React.ReactNode;
}
const InputMessageDefaultProps = {};

function InputMessage(p: InputMessageProps & typeof InputMessageDefaultProps) {
  return (
    <StyledLabel {...p} >
      {p.children}
    </StyledLabel>
  );
}

InputMessage.defaultProps = InputMessageDefaultProps;
export default InputMessage;

// 스타일 컴포넌트
const StyledLabel = styled.p<InputMessageProps>`
  margin: ${p => p.margin};
  margin-top: ${p => p.marginTop};
  margin-bottom: ${p => p.marginBottom};
  margin-left: ${p => p.marginLeft};
  margin-right: ${p => p.marginRight};
  width: ${p => p.width};
  text-align: ${p => p.textAlign};
  color: red;
  word-break: break-all;
`;