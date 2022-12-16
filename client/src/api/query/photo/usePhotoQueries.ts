import { useQueries, useQuery, QueryOptions, QueriesOptions, UseQueryResult } from "@tanstack/react-query";
import { AxiosError } from 'axios';
import { ErrorType } from '@util/request';
import { ResType } from '@api/query/photo/usePhotoQuery';
import * as queryKey from '@api/queryKey';

// export default usePhotoQueries(

// ): UseQueryResult<ResType, AxiosError<ErrorType>> {
//   return useQuery(queryKey.photoKeys.detail)
// }