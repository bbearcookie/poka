import React, { useRef, useCallback } from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import InputMessage from '@component/form/InputMessage';
import useModal from '@component/modal/useModal';
import TitleModal from '@component/modal/TitleModal';
import TitleLabel from '@component/label/titleLabel/TitleLabel';
import Button from '@component/form/Button';
import { Card, CardHeader, CardBody } from '@component/card/basic/_styles';
import PhotoListWithFilter from '@component/list/photo/PhotoListWithFilter';
import PhotoList from './photo/PhotoList';
import { State, Action } from '../reducer';

interface Props {
  state: State;
  dispatch: React.Dispatch<Action>;
}

function VoucherSection({ state, dispatch }: Props) {
  const addModal = useModal();
  const nextId = useRef(0);

  // 소유권 선택 공간에 포토카드 추가
  const handleAddVoucher = useCallback(
    (photocardId: number) => {
      dispatch({
        type: 'ADD_VOUCHER',
        voucher: {
          id: nextId.current++,
          photocardId,
          amount: 1,
          message: '',
        },
      });
      dispatch({ type: 'SET_MESSAGE', target: 'vouchers', value: '' });
      addModal.close();
    },
    [dispatch, addModal]
  );

  // 모달 열기
  const openModal = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      setTimeout(() => addModal.open(), 0);
    },
    [addModal]
  );

  return (
    <>
      <Card css={{ marginBottom: '2em' }}>
        <CardHeader>
          <TitleLabel title="소유권 선택">
            <Button
              leftIcon={faPlus}
              styles={{
                height: 'fit-content',
                theme: 'primary',
                padding: '0.7em 1.3em',
                iconMargin: '1em',
              }}
              onClick={openModal}
            >
              추가
            </Button>
          </TitleLabel>
        </CardHeader>
        <CardBody>
          {state.form.vouchers.length > 0 && <PhotoList state={state} dispatch={dispatch} />}
          {state.message.vouchers && (
            <InputMessage styles={{ margin: '0 0 0.5em 0' }}>{state.message.vouchers}</InputMessage>
          )}
          <p className="description">사용자에게 발급하려는 소유권의 종류와 수량을 지정합니다.</p>
        </CardBody>
      </Card>

      <TitleModal hook={addModal} title="소유권 선택" cssProp={{ width: '75vw' }}>
        <PhotoListWithFilter icon={{ svg: faPlus }} handleSelect={handleAddVoucher} />
      </TitleModal>
    </>
  );
}

export default VoucherSection;
