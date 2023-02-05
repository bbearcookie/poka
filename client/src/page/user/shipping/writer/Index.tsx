import React, { useCallback, useReducer } from 'react';
import qs from 'qs';
import addressReducer, { initialState as AddressInitState } from '@component/address/editor/reducer';
import VoucherSection from './content/VoucherSection';
import AddressSection from './content/address/Index';
import ButtonSection from './content/ButtonSection';
import './Index.scss';

interface Props {

}
const DefaultProps = {};

function Index({  }: Props) {
  const querystring = qs.parse(window.location.search, { ignoreQueryPrefix: true });
  const voucherId = Number(querystring.voucherId) || 0;
  const [addressState, addressDispatcher] = useReducer(addressReducer, AddressInitState);

  const onSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    console.log(addressState);
  }, [addressState]);

  return (
    <div className="ShippingWriterPage">
      <h1 className="title-label">소유권 배송 요청</h1>
      <form onSubmit={onSubmit}>
        <VoucherSection />
        <AddressSection state={addressState} dispatch={addressDispatcher} />
        <ButtonSection />
      </form>
    </div>
  );
}

export default Index;