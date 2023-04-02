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
    <div className="shipping-section">
      {status === 'success' && <Success res={addresses} userId={userId} />}
      {status === 'loading' && <Loading />}
    </div>
  );
}

export default Index;