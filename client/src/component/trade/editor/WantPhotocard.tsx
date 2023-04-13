import React from 'react';
import useModal from '@component/modal/useModal';
import { State, Action } from './reducer';
import Card from './content/wantcard/Card';
import Modal from './content/wantcard/Modal';
import { CSSProp } from 'styled-components';

interface Props {
  state: State;
  dispatch: React.Dispatch<Action>;
  cssProp?: CSSProp;
}

function WantPhotocard({ state, dispatch, cssProp }: Props) {
  const modal = useModal();

  return (
    <>
      <Card modal={modal} state={state} dispatch={dispatch} cssProp={cssProp} />
      <Modal modal={modal} state={state} dispatch={dispatch} />
    </>
  );
}

export default WantPhotocard;
