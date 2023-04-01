import React, { useCallback } from 'react';
import { toast } from 'react-toastify';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import PhotoListWithFilter from '@component/list/photo/PhotoListWithFilter';
import TitleModal from '@component/modal/TitleModal';
import { State, Action } from '../../reducer';
import { ModalHookType } from '@hook/useModal';

interface Props {
  modal: ModalHookType;
  state: State;
  dispatch: React.Dispatch<Action>;
}

function Modal({ modal, state, dispatch }: Props) {
  
  // 받으려는 포토카드 추가
  const addPhoto = useCallback(
    (photocardId: number) => {
      if (state.data.wantPhotocardIds.length >= 10)
        return toast.error('받으려는 포토카드는 최대 10종류만 선택할 수 있어요.', {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      dispatch({ type: 'ADD_PHOTO', payload: photocardId });
      dispatch({ type: 'SET_MESSAGE', target: 'wantPhotocardIds', value: '' });
      dispatch({ type: 'SET_MESSAGE', target: 'amount', value: '' });
      modal.close();
    },
    [state, modal, dispatch]
  );

  return (
    <TitleModal hook={modal} titleName="포토카드 선택" styles={{ width: '75%' }}>
      <PhotoListWithFilter icon={{ svg: faAdd }} handleSelect={addPhoto} />
    </TitleModal>
  );
}

export default Modal;
