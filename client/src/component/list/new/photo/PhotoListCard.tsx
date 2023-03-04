import React from 'react';
import useSearcher from '@component/search/useSearcher';
import Searcher from '@component/search/Searcher';

const category = {
  photoname: '포토카드',
  username: '아이디'
}

interface Props {}

function PhotoListCard({  }: Props) {
  const { filter, keyword, filterDispatch, keywordDispatch } = useSearcher();

  return (
    <div>
      <Searcher
        category={{
          photoname: '포토카드',
          username: '아이디'
        }}
        options={{
          group: true,
          member: true,
          voucherState: true
        }}
        filter={filter}
        keyword={keyword}
        filterDispatch={filterDispatch}
        keywordDispatch={keywordDispatch}
      />
    </div>
  );
}

export default PhotoListCard;