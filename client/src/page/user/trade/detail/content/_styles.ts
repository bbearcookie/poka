import styled from 'styled-components';

export const ButtonSection = styled.section`
  display: flex;
  justify-content: flex-end;
`;

export const CheckBoxInput = styled.input.attrs({ type: 'checkbox', readOnly: true })`
  transform: scale(2);
  cursor: pointer;
`;
