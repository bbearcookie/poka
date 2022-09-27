import React from 'react';
import CardHeader from '@component/card/basic/CardHeader';

interface SearchLabelListProps {
  children?: React.ReactNode;
}
const SearchLabelListDefaultProps = {};

function SearchLabelList({ children }: SearchLabelListProps & typeof SearchLabelListDefaultProps) {
  return (
    <CardHeader>
      여기에 라벨들 보여줄거임
    </CardHeader>
  );
}

SearchLabelList.defaultProps = SearchLabelListDefaultProps;
export default SearchLabelList;