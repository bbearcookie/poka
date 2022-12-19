import React from 'react';
import useShippingAddresses from '@api/query/address/useShippingAddresses';
import { useAppSelector } from '@app/redux/reduxHooks';
import ErrorCard from '@component/card/ErrorCard';
import Loading from './Loading';
import Success from './Success';

interface Props {}
const DefaultProps = {};

function Index({  }: Props) {
  const userId = useAppSelector(state => state.auth.user_id);
  const { status, data: addresses, error } = useShippingAddresses(userId, { enabled: userId !== 0 });

  return (
    <section className="shipping-section">
      {status === 'success' && <Success addresses={addresses} />}
      {status === 'loading' && <Loading />}
      {status === 'error' && <ErrorCard error={error} /> }
    </section>
  );
}

export default Index;