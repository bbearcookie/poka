import React from 'react';
import useModal from '@component/modal/useModal';
import { State, Action } from './reducer';
import Card from './content/wantcard/Card';
import Modal from './content/wantcard/Modal';

interface Props {
  state: State;
  dispatch: React.Dispatch<Action>;
}

function WantPhotocard({ state, dispatch }: Props) {
  const modal = useModal();

  return (
    <>
      <Card modal={modal} state={state} dispatch={dispatch} />
      <Modal modal={modal} state={state} dispatch={dispatch} />
    </>
  );
}

export default WantPhotocard;
