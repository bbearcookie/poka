import React from 'react';
import useShippingAddresses from '@api/query/shipping/useShippingAddressesQuery';
import Success from './Success';
import Loading from './Loading';

interface Props {
  userId: number;
}

function Index({ userId }: Props) {
  const { status, data: addresses, error } = useShippingAddresses(userId);

  return (
    <>
      {status === 'success' && <Success res={addresses} userId={userId} />}
      {status === 'loading' && <Loading />}
    </>
  );
}

export default Index;