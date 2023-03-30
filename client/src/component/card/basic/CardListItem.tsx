import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';

interface Props {
  className?: string;
  title?: string | React.ReactNode;
  titleStyles?: string;
  styles?: StylesProps;
  children?: React.ReactNode;
}

function CardListItem({ className, title, styles, children }: Props) {
  return (
    <StyledCardListItem className={classNames('CardListItem', className)} {...styles}>
      <TitleLabel>{title}</TitleLabel>
      <section>{children}</section>
    </StyledCardListItem>
  );
}

export default CardListItem;

// 스타일 컴포넌트
export interface StylesProps {
  color?: string;
  borderBottom?: string;
}
const StyledCardListItem = styled.li<StylesProps>`
  display: flex;
  border-bottom: ${p => p.borderBottom || '1px solid #E5E7EB'};
  padding: 1.5em;
  color: ${p => p.color};

  @media screen and (max-width: 65rem) {
    flex-direction: column;
    gap: 0.5em;
  }
`;

export interface TitleStyles {
  flexBasis?: string;
}
const TitleLabel = styled.div<TitleStyles>`
  flex-basis: ${p => p.flexBasis || '30%'};
  color: #121828;
`;
