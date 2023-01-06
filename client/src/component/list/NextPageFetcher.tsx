import React, { useCallback } from 'react';
import { useUpdateEffect } from 'react-use';
import { useInView } from 'react-intersection-observer';

interface Props {
  hasNextPage: boolean | undefined;
  fetchNextPage: Function;
}
const DefaultProps = {};

// useInfiniteQuery를 사용하는 곳에서 다음 페이지를 가져올 때 사용하는 컴포넌트
function NextPageFetcher({ hasNextPage, fetchNextPage }: Props) {
  const [viewRef, inView] = useInView();

  // 다음 페이지 가져오기
  const handleFetchNextPage = useCallback(() => {
    if (!inView) return;
    if (!hasNextPage) return;
    
    fetchNextPage();
  }, [inView, hasNextPage, fetchNextPage]);
  useUpdateEffect(() => {
    handleFetchNextPage();
  }, [inView]);

  return (
    <div ref={viewRef} />
  );
}

export default NextPageFetcher;