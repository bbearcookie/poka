import React, { useCallback, useReducer } from 'react';
import produce from 'immer';
import useModifyShippingAddress from '@api/mutation/shipping/address/useModifyShippingAddress';
import { Address as AddressType } from '@type/shipping';
import { reducer, initialState, FormType } from '@component/shipping/address/editor/reducer';
import Button from '@component/form/button/Button';
import AddressEditor from '@component/shipping/address/editor/AddressEditor';
import { ButtonSection } from '@component/form/_styles';

interface Props {
  address: AddressType;
  closeEditor: () => void;
}

function Editor({ address, closeEditor }: Props) {
  const [state, dispatch] = useReducer(
    reducer,
    initialState,
    produce(draft => {
      draft.form = address;
    })
  );

  // 데이터 수정 요청
  const putMutation = useModifyShippingAddress<keyof FormType>(
    address.addressId,
    res => {
      dispatch({ type: 'SET_FORM', form: initialState.form });
      closeEditor();
    },
    err => {
      err.response?.data.errors.forEach(e => {
        if (e.param.substring(0, 8) === 'address.') {
          dispatch({
            type: 'SET_MESSAGE',
            target: e.param.substring(8) as keyof FormType,
            value: e.message,
          });
        }
      });
    }
  );

  // 폼 전송 이벤트
  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      putMutation.mutate({ address: state.form });
    },
    [state, putMutation]
  );

  return (
    <AddressEditor state={state} dispatch={dispatch}>
      <ButtonSection css={{ marginTop: '2em' }}>
        <Button
          buttonTheme="primary"
          type="button"
          onClick={onSubmit}
          css={{
            padding: '0.7em 1em',
          }}
        >
          수정
        </Button>
        <Button
          buttonTheme="gray-outlined"
          onClick={closeEditor}
          css={{
            padding: '0.7em 1em',
          }}
        >
          취소
        </Button>
      </ButtonSection>
    </AddressEditor>
  );
}

export default Editor;
