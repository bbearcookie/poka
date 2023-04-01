import { useCallback } from 'react';
import { InfiniteQueryObserverResult, FetchNextPageOptions } from '@tanstack/react-query';
import { useUpdateEffect } from 'react-use';
import { useInView } from 'react-intersection-observer';

interface Props {
  hasNextPage: boolean | undefined;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult>;
}

// useInfiniteQuery를 사용하는 곳에서 다음 페이지를 가져올 때 사용하는 컴포넌트
function NextPageFetcher({ hasNextPage, fetchNextPage }: Props) {
  const [viewRef, inView] = useInView();

  // 다음 페이지 가져오기
  const handleFetchNextPage = useCallback(async () => {
    if (!hasNextPage) return;
    await fetchNextPage();
  }, [hasNextPage, fetchNextPage]);
  useUpdateEffect(() => {
    if (!inView) return;
    handleFetchNextPage();
  }, [inView]);

  return <div ref={viewRef} />;
}

export default NextPageFetcher;
