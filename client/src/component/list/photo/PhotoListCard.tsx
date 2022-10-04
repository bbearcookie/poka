import React from 'react';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import Card from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardBody from '@component/card/basic/CardBody';
import SearchInput from './content/SearchInput';
import SearchLabelList from './content/SearchLabelList';
import FilterCheck from './content/FilterCheck';
import PhotoList from './content/PhotoList';
import { PhotoType } from '@api/photoAPI';
import './PhotoListCard.scss';

interface PhotoListCardProps {
  icon?: IconDefinition;
  handleClickIcon?: (photo: PhotoType) => void;
  children?: React.ReactNode;
}
const PhotoListCardDefaultProps = {};

function PhotoListCard({ icon, handleClickIcon, children }: PhotoListCardProps & typeof PhotoListCardDefaultProps) {
  return (
    <Card>
      <CardHeader padding="0" borderBottom="0">
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