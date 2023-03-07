import React, { Fragment } from 'react';
import { InfiniteData } from '@tanstack/react-query';
import { ResType } from '@api/query/shipping/useShippingsQuery';
import Shipping from './content/Shipping';

interface Props {
  res: InfiniteData<ResType>;
}

function Success({ res }: Props) {

  return (
    <>
      {res.pages.map((page, i) =>
      <Fragment key={i}>
        {page.shippings.map(r =>
        <Shipping
          key={r.requestId}
          shippingState={r.requestState}
          {...r}
        />)}
      </Fragment>)}
    </>
  );
}

export default Success;