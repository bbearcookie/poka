import React from 'react';
import Card from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardBody from '@component/card/basic/CardBody';
import SearchInput from './content/SearchInput';
import SearchLabelList from './content/SearchLabelList';
import FilterCheck from './content/FilterCheck';
import PhotoList from './content/PhotoList';

interface PhotoListContainerProps {
  children?: React.ReactNode;
}
const PhotoListContainerDefaultProps = {};

function PhotoListContainer({ children }: PhotoListContainerProps & typeof PhotoListContainerDefaultProps) {
  return (
    <Card>
      <CardHeader padding="0" borderBottom="0">
        <SearchInput />
        <SearchLabelList />
      </CardHeader>
      <CardBody>
        <FilterCheck />
        <PhotoList />
      </CardBody>
    </Card>
  );
}

PhotoListContainer.defaultProps = PhotoListContainerDefaultProps;
export default PhotoListContainer;