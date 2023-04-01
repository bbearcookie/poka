import useModal from '@hook/useModal';
import Card from './content/voucher/Card';
import Modal from './content/voucher/Modal';
import { State, Action } from './reducer';

interface Props {
  ableToChange?: boolean; // 소유권 선택 가능 여부
  state: State;
  dispatch: React.Dispatch<Action>;
}

function Voucher({ ableToChange = true, state, dispatch }: Props) {
  const modal = useModal();

  return (
    <>
      <Card ableToChange={ableToChange} modal={modal} state={state} dispatch={dispatch} />
      <Modal modal={modal} state={state} dispatch={dispatch} />
    </>
  );
}

export default Voucher;