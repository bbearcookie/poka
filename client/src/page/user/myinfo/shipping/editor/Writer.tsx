import React, { useCallback, useReducer } from 'react';
import useAddShippingAddress from '@api/mutation/shipping/address/useAddShippingAddress';
import { reducer, initialState, FormType } from '@component/shipping/address/editor/reducer';
import Button from '@component/form/Button';
import AddressEditor from '@component/shipping/address/editor/AddressEditor';
import { ButtonSection } from '@page/user/myinfo/_styles';

interface Props {
  userId: number;
  closeEditor: () => void;
}

function Writer({ userId, closeEditor }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // 데이터 추가 요청
  const postMutation = useAddShippingAddress<keyof FormType>(
    userId,
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
      postMutation.mutate({ address: state.form });
    },
    [state, postMutation]
  );

  return (
    <AddressEditor state={state} dispatch={dispatch}>
      <ButtonSection>
        <Button
          type="button"
          onClick={onSubmit}
          styles={{
            theme: 'primary',
            padding: '0.7em 1em',
            marginLeft: '0.5em',
          }}
        >
          추가
        </Button>
        <Button
          onClick={closeEditor}
          styles={{
            theme: 'gray-outlined',
            padding: '0.7em 1em',
            marginLeft: '0.5em',
          }}
        >
          취소
        </Button>
      </ButtonSection>
    </AddressEditor>
  );
}

export default Writer;
