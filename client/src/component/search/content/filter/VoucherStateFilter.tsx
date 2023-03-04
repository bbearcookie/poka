import React, { useCallback } from 'react';
import DropdownItem from '@component/dropdown/DropdownItem';
import { VoucherStateKey, VoucherStateValue } from '@component/label/StateLabel';
import Filter from './content/_Filter';
import { State, Action } from './reducer';

interface Props {
  state: State;
  dispatch: React.Dispatch<Action>;
}

function VoucherStateFilter({ state, dispatch }: Props) {

  // 아이템 클릭시 필터 변경
  const handleClickItem = useCallback((key: string) => {
    dispatch({ type: "SET_VOUCHER_STATE", value: key as VoucherStateKey });
  }, [dispatch]);

  return (
    <Filter title="상태">
      {Object.entries(VoucherStateValue).map(([key, value]) =>
      <DropdownItem
        key={key}
        className="item"
        onClick={() => handleClickItem(key)}
      >
        <input type="radio" checked={state.voucherState === key} readOnly />
        <span>{value}</span>
      </DropdownItem>)}
    </Filter>
  );
}

export default VoucherStateFilter;