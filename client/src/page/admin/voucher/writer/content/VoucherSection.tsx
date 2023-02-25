import React, { useRef, useCallback } from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import InputMessage from '@component/form/InputMessage';
import useModal from '@hook/useModal';
import TitleModal from '@component/modal/TitleModal';
import Button from '@component/form/Button';
import Card from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardBody from '@component/card/basic/CardBody';
import PhotoListCard from '@component/list/photo/PhotoListCard';
import PhotoList from './photo/PhotoList';
import { State, Action } from '../reducer';

interface Props {
  state: State;
  dispatch: React.Dispatch<Action>;
}
const DefaultProps = {};

function VoucherSection({ state, dispatch }: Props) {
  const addModal = useModal();
  const nextId = useRef(0);

  // // 소유권 선택 공간에 포토카드 추가
  const handleAddVoucher = useCallback((photocardId: number) => {
    dispatch({ type: 'ADD_VOUCHER', voucher: {
      id: nextId.current++,
      photocardId,
      amount: 1,
      message: ''
    }});
    dispatch({ type: 'SET_MESSAGE', target: 'vouchers', value: '' });
    addModal.close();
  }, [dispatch, addModal]);

  return (
    <section className="VoucherSection">
      <Card styles={{ marginBottom: "2em" }}>
        <CardHeader>
          <section className="label-section">
            <h3 className="label">소유권 선택</h3>
            <Button
              leftIcon={faPlus}
              styles={{
                height: 'fit-content',
                theme: "primary",
                padding: "0.7em 1.3em",
                iconMargin: "1em"
              }}
              onClick={(e) => { e.stopPropagation(); addModal.open(); }}
            >추가</Button>
          </section>
        </CardHeader>
        <CardBody>
          <p className="description">사용자에게 발급하려는 소유권의 종류와 수량을 지정합니다.</p>
          {state.form.vouchers.length > 0 && <PhotoList state={state} dispatch={dispatch} />}
          {state.message.vouchers && <InputMessage styles={{ margin: '1em 0 0 0' }}>{state.message.vouchers}</InputMessage>}
        </CardBody>
      </Card>

      <TitleModal hook={addModal} titleName="소유권 선택" styles={{ width: '75%' }}>
        <PhotoListCard
          icon={{ svg: faPlus, tooltip: '선택' }}
          handleClickIcon={handleAddVoucher}
          cardStyles={{ border: "none" }}
        />
      </TitleModal>
    </section>
  );
}

export default VoucherSection;