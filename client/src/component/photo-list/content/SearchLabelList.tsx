import React, { useState, useCallback } from 'react';
import { useAppSelector, useAppDispatch } from '@app/reduxHooks';
import SearchLabel from '@component/label/SearchLabel';
import CardHeader from '@component/card/basic/CardHeader';
import { category } from './searchSlice';
import { removeLabel } from './searchSlice';

interface SearchLabelListProps {
  children?: React.ReactNode;
}
const SearchLabelListDefaultProps = {};

function SearchLabelList({ children }: SearchLabelListProps & typeof SearchLabelListDefaultProps) {
  const { labels } = useAppSelector((state) => state.adminPhotoSearch);
  const dispatch = useAppDispatch();

  // 검색 라벨 삭제
  const onRemove = useCallback((id: number) => {
    dispatch(removeLabel(id));
  }, [dispatch]);

  return (
    <>
    {labels.length > 0 && (
      <CardHeader>
        <section className="search-label-section">
          {labels.map((item) => (
            <SearchLabel
              id={item.id}
              key={item.id}
              category={category[item.data.type]}
              text={item.text}
              handleRemove={onRemove}
            />
          ))}
        </section>
      </CardHeader>
    )}
    </>
  );
}

SearchLabelList.defaultProps = SearchLabelListDefaultProps;
export default SearchLabelList;