import React, { useCallback } from 'react';
import { VoucherStateText } from '@component/label/stateLabel/_types';
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
        text={VoucherStateText[state.voucherState]}
        handleClick={handleCancelFilter}
      />}
    </>
  );
}

export default VoucherStateKeywords;