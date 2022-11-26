import React from 'react';
import { useAppSelector } from '@app/redux/reduxHooks';
import { useQuery } from 'react-query';
import * as userAPI from '@api/userAPI';
import * as queryKey from '@util/queryKey';
import { ErrorType } from '@util/request';
import { AxiosError } from 'axios';
import ErrorCard from '@component/card/ErrorCard';
import Loading from './Loading';
import Success from './Success';

interface IndexProps {
  children?: React.ReactNode;
}
const IndexDefaultProps = {};

function Index({ children }: IndexProps & typeof IndexDefaultProps) {
  const userId = useAppSelector(state => state.auth.user_id);

  const { status, data: addresses, error } =
  useQuery<typeof userAPI.getUserShippingAddress.resType, AxiosError<ErrorType>>
  (queryKey.userKeys.address(userId), () => userAPI.getUserShippingAddress.axios(userId));

  return (
    <section className="shipping-section">
      {status === 'success' && <Success addresses={addresses} />}
      {status === 'loading' && <Loading />}
      {status === 'error' && <ErrorCard error={error} /> }
    </section>
  );
}

Index.defaultProps = IndexDefaultProps;
export default Index;