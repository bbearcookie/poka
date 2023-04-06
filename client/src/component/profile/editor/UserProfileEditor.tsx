import React from 'react';
import { StyledUserProfileEditor } from './_styles';
import { State, Action } from './reducer';
import Image from './contents/Image';
import Nickname from './contents/Nickname';
import Buttons from './contents/Buttons';
import { CSSProp } from 'styled-components';

interface Props {
  state: State;
  dispatch: React.Dispatch<Action>;
  handleCancel?: () => void;
  handleSubmit?: () => void;
  cssProp?: CSSProp;
}

function UserProfileEditor({ state, dispatch, handleCancel, handleSubmit, cssProp }: Props) {
  return (
    <StyledUserProfileEditor css={cssProp}>
      <Image state={state} dispatch={dispatch} />
      <main className="content-section">
        <Nickname state={state} dispatch={dispatch} />
        <Buttons handleCancel={handleCancel} handleSubmit={handleSubmit} />
      </main>
    </StyledUserProfileEditor>
  );
}

export default UserProfileEditor;
