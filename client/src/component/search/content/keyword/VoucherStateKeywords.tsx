import React, { useCallback } from 'react';
import { VoucherStateValue } from '@component/label/StateLabel';
import { State, Action } from '@component/search/content/filter/reducer';
import Keyword from './content/_Keyword';

interface Props {
  state: State;
  dispatch: React.Dispatch<Action>;
}

function VoucherStateKeywords({ state, dispatch }: Props) {

  const handleCancelFilter = useCallback(() => {
    dispatch({ type: 'SET_VOUCHER_STATE', value: 'all' })
  }, [dispatch]);

  return (
    <>
      {state.voucherState !== 'all' &&
      <Keyword
        category="소유권 상태"
        text={VoucherStateValue[state.voucherState]}
        handleClick={handleCancelFilter}
      />}
    </>
  );
}

export default VoucherStateKeywords;