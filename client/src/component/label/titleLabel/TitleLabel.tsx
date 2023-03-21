import React from 'react';
import { StyledTitle, Props as StylesProps } from './_styles';

interface Props {
  title?: string;
  styles?: StylesProps;
  children?: React.ReactNode;
}

function TitleLabel({ title, styles, children }: Props) {
  return (
    <StyledTitle {...styles}>
      <h1 className="title">{title}</h1>
      {children}
    </StyledTitle>
  );
}

export default TitleLabel;