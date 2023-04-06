import useModal from '@component/modal/useModal';
import Card from './content/voucher/Card';
import Modal from './content/voucher/Modal';
import { State, Action } from './reducer';
import { CSSProp } from 'styled-components';

interface Props {
  ableToChange?: boolean; // 소유권 선택 가능 여부
  state: State;
  dispatch: React.Dispatch<Action>;
  cssProp?: CSSProp;
}

function Voucher({ ableToChange = true, state, dispatch, cssProp }: Props) {
  const modal = useModal();

  return (
    <>
      <Card
        ableToChange={ableToChange}
        modal={modal}
        state={state}
        dispatch={dispatch}
        cssProp={cssProp}
      />
      <Modal modal={modal} state={state} dispatch={dispatch} />
    </>
  );
}

export default Voucher;
