import { useQuery, QueryOptions, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ErrorType } from '@util/request';
import { AddressType } from '@type/user';
import { fetchUserShippingAddress } from '@api/api/address';
import * as queryKey from '@api/queryKey';

export interface ResType {
  message: string;
  addresses: AddressType[];
}

export default function useShippingAddresses(
  userId: number,
  options?: QueryOptions<ResType, AxiosError<ErrorType>>
): UseQueryResult<ResType, AxiosError<ErrorType>> {
  return useQuery(queryKey.userKeys.address(userId), () => fetchUserShippingAddress(userId), options);
}