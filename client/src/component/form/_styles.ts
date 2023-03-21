import styled from 'styled-components';

interface ButtonSectionProps {
  margin?: string;
  marginTop?: string;
  marginBottom?: string;
  marginLeft?: string;
  marginRight?: string;
}

export const ButtonSection = styled.section<ButtonSectionProps>`
  margin: ${p => p.margin};
  margin-top: ${p => p.marginTop};
  margin-bottom: ${p => p.marginBottom};
  margin-left: ${p => p.marginLeft};
  margin-right: ${p => p.marginRight};
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 1em;
`