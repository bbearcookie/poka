import { VoucherState as VoucherStateType } from '@type/voucher';
import CardListItem from '@component/card/basic/CardListItem';
import StateLabel from '@component/label/stateLabel/StateLabel';

interface Props {
  voucherState: VoucherStateType;
}

export function VoucherState({ voucherState }: Props) {
  return (
    <CardListItem title="상태">
      <StateLabel
        state={{ type: 'voucher', key: voucherState }}
        styles={{ width: '6em', margin: '0' }}
      />
    </CardListItem>
  );
}
export default VoucherState;
