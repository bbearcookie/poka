import React, { useCallback } from 'react';
import { useAppSelector, useAppDispatch } from '@app/redux/reduxHooks';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import InputMessage from '@component/form/InputMessage';
import useModal from '@hook/useModal';
import TitleModal from '@component/modal/TitleModal';
import Button from '@component/form/Button';
import Card from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardBody from '@component/card/basic/CardBody';
import PhotoListCard from '@component/list/photo/PhotoListCard';
import { addVoucher, setMessage } from '../voucherWriterSlice';
import PhotoList from './PhotoList';

interface Props {}
const DefaultProps = {};

function VoucherSection({  }: Props) {
  const { vouchers } = useAppSelector((state) => state.voucherWriter);
  const addModal = useModal();
  const dispatch = useAppDispatch();

  // 소유권 선택 공간에 포토카드 추가
  const handleAddVoucher = useCallback((photocardId: number) => {
    dispatch(addVoucher(photocardId));
    dispatch(setMessage({ type: 'vouchers', message: '' }));
    addModal.close();
  }, [addModal, dispatch]);

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
          {vouchers.value.length > 0 && <PhotoList />}
          {vouchers.message && <InputMessage styles={{ margin: '1em 0 0 0' }}>{vouchers.message}</InputMessage>}
        </CardBody>
      </Card>

      <TitleModal hook={addModal} titleName="소유권 선택" styles={{ width: '75%' }}>
        <PhotoListCard
          icon={faPlus}
          handleClickIcon={handleAddVoucher}
          cardStyles={{ border: "none" }}
        />
      </TitleModal>
    </section>
  );
}

export default VoucherSection;