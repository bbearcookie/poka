import useModal from '@hook/useModal';
import Card from './content/voucher/Card';
import Modal from './content/voucher/Modal';
import { State, Action } from './reducer';

interface Props {
  state: State;
  dispatch: React.Dispatch<Action>;
}

function Voucher({ state, dispatch }: Props) {
  const modal = useModal();

  return (
    <>
      <Card modal={modal} state={state} dispatch={dispatch} />
      <Modal modal={modal} state={state} dispatch={dispatch} />
    </>
  );
}

export default Voucher;