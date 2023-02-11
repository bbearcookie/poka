import React, { useCallback, useState, useReducer } from 'react';
import qs from 'qs';
import addressReducer, { initialState as AddressInitState } from '@component/address/editor/reducer';
import VoucherSection from './content/voucher/VoucherSection';
import AddressSection from './content/address/Index';
import ButtonSection from './content/ButtonSection';
import './Index.scss';

interface Props {

}
const DefaultProps = {};

function Index({  }: Props) {
  const querystring = qs.parse(window.location.search, { ignoreQueryPrefix: true });
  const [voucherIds, setVoucherIds] = useState<number[]>(Number(querystring.voucherId) ? [Number(querystring.voucherId)] : []);
  const [addressState, addressDispatcher] = useReducer(addressReducer, AddressInitState);

  const onSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    console.log(addressState);
    console.log(voucherIds);
  }, [addressState, voucherIds]);

  return (
    <div className="ShippingWriterPage">
      <h1 className="title-label">소유권 배송 요청</h1>
      <form onSubmit={onSubmit}>
        <VoucherSection voucherIds={voucherIds} setVoucherIds={setVoucherIds} />
        <AddressSection state={addressState} dispatch={addressDispatcher} />
        <ButtonSection />
      </form>
    </div>
  );
}

export default Index;