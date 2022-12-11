import React from 'react';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import Card, { StylesProps as CardStyle } from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardBody from '@component/card/basic/CardBody';
import SearchInput from './content/SearchInput';
import SearchLabelList from './content/SearchLabelList';
import FilterCheck from './content/FilterCheck';
import PhotoList from './content/PhotoList';
import './PhotoListCard.scss';

interface PhotoListCardProps {
  icon?: IconDefinition;
  handleClickIcon?: (photocardId: number) => void;
  cardStyles?: CardStyle;
  children?: React.ReactNode;
}
const PhotoListCardDefaultProps = {};

function PhotoListCard({ icon, handleClickIcon, cardStyles, children }: PhotoListCardProps & typeof PhotoListCardDefaultProps) {
  return (
    <Card styles={cardStyles}>
      <CardHeader styles={{ padding: "0", borderBottom: "0" }}>
        <SearchInput />
        <SearchLabelList />
      </CardHeader>
      <CardBody>
        <FilterCheck />
        <PhotoList icon={icon} handleClickIcon={handleClickIcon} />
      </CardBody>
    </Card>
  );
}

PhotoListCard.defaultProps = PhotoListCardDefaultProps;
export default PhotoListCard;