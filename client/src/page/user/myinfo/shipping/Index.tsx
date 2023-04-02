import React from 'react';
import useShippingAddresses from '@api/query/shipping/useShippingAddressesQuery';
import { useAppSelector } from '@app/redux/reduxHooks';
import ErrorCard from '@component/card/ErrorCard';
import Loading from './Loading';
import Success from './Success';

function Index() {
  const { userId } = useAppSelector(state => state.auth);
  const { status, data: addresses, error } = useShippingAddresses(userId);

  return (
    <section className="shipping-section">
      {status === 'success' && <Success addresses={addresses} />}
      {status === 'loading' && <Loading />}
      {status === 'error' && <ErrorCard error={error} /> }
    </section>
  );
}

export default Index;