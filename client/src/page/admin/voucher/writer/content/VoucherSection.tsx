import React, { useCallback } from 'react';
import { useAppSelector, useAppDispatch } from '@app/redux/reduxHooks';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { PhotoType } from '@component/photocard/PhotoCard';
import InputMessage from '@component/form/InputMessage';
import useModal from '@hook/useModal';
import Modal from '@component/modal/basic/Modal';
import Button from '@component/form/Button';
import Card from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardBody from '@component/card/basic/CardBody';
import PhotoListCard from '@component/list/photo/PhotoListCard';
import { addVoucher, setMessage } from '../voucherWriterSlice';
import PhotoList from './PhotoList';

interface VoucherSectionProps {
  children?: React.ReactNode;
}
const VoucherSectionDefaultProps = {};

function VoucherSection({ children }: VoucherSectionProps & typeof VoucherSectionDefaultProps) {
  const { vouchers } = useAppSelector((state) => state.voucherWriter);
  const addModal = useModal();
  const dispatch = useAppDispatch();

  // 소유권 선택 공간에 포토카드 추가
  const handleAddVoucher = useCallback((photo: PhotoType) => {
    dispatch(addVoucher(photo.photocard_id));
    dispatch(setMessage({ type: 'vouchers', message: '' }));
    addModal.close();
  }, [addModal, dispatch]);

  return (
    <section className="VoucherSection">
      <Card marginBottom="2em">
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

      <Modal hook={addModal} styles={{ width: '75%' }}>
        <Card>
          <CardBody>
            {/* <PhotoListContainer icon={faPlus} handleClickIcon={handleAddVoucher} /> */}
            <PhotoListCard icon={faPlus} handleClickIcon={handleAddVoucher} />
          </CardBody>
        </Card>
      </Modal>
    </section>
  );
}

VoucherSection.defaultProps = VoucherSectionDefaultProps;
export default VoucherSection;