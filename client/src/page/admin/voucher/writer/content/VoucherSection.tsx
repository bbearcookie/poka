import React, { useCallback } from 'react';
import { faArrowRight, faPlus } from '@fortawesome/free-solid-svg-icons';
import useModal from '@hook/useModal';
import PhotoListContainer from '@component/photo-list/PhotoListContainer';
import Card from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardBody from '@component/card/basic/CardBody';
import Modal from '@component/modal/basic/Modal';
import Input from '@component/form/Input';
import IconButton from '@component/form/IconButton';
import { PhotoType } from '@component/photo-list/basic/PhotoCard';
import Button from '@component/form/Button';

interface VoucherSectionProps {
  children?: React.ReactNode;
}
const VoucherSectionDefaultProps = {};

function VoucherSection({ children }: VoucherSectionProps & typeof VoucherSectionDefaultProps) {
  const addModal = useModal();

  // TODO: 모달 닫고 상태값에 클릭된 포토카드 추가
  const handleAddVoucher = useCallback((photo: PhotoType) => {
    console.log(`${photo.photocard_id} 를 추가하면 된다.`);
    addModal.close();
  }, [addModal]);

  return (
    <>
      <Card marginBottom="2em">
        <CardHeader>
          <section className="title-label-section">
            <h3 className="title-label">소유권 선택</h3>
            <Button
              leftIcon={faPlus}
              styles={{
                height: 'fit-content',
                theme: "primary",
                padding: "0.7em 1.3em",
                iconMargin: "1em"
              }}
              onClick={(e) => { e.stopPropagation(); addModal.open() }}
            >추가</Button>
          </section>
        </CardHeader>
        <CardBody>
          <p className="description">사용자에게 발급하려는 소유권의 종류와 수량을 지정합니다.</p>
        </CardBody>
      </Card>

      <Modal hook={addModal} styles={{ width: '75%' }}>
        <Card>
          <CardBody>
            <PhotoListContainer icon={faArrowRight} handleClickIcon={handleAddVoucher} />
          </CardBody>
        </Card>
      </Modal>
    </>
  );
}

VoucherSection.defaultProps = VoucherSectionDefaultProps;
export default VoucherSection;