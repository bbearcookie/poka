import React from 'react';
import { StyledUserProfileEditor } from './_styles';
import { State, Action } from './reducer';
import Image from './contents/Image';
import Nickname from './contents/Nickname';
import Buttons from './contents/Buttons';

interface Props {
  state: State;
  dispatch: React.Dispatch<Action>;
  handleCancel?: () => void;
  handleSubmit?: () => void;
}

function UserProfileEditor({ state, dispatch, handleCancel, handleSubmit }: Props) {
  return (
    <StyledUserProfileEditor>
      <Image state={state} dispatch={dispatch} />
      <main className="content-section">
        <Nickname state={state} dispatch={dispatch} />
        <Buttons handleCancel={handleCancel} handleSubmit={handleSubmit} />
      </main>
    </StyledUserProfileEditor>
  );
}

export default UserProfileEditor;
