import React, { useCallback } from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import useModal from '@hook/useModal';
import Card from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardBody from '@component/card/basic/CardBody';
import Modal from '@component/modal/basic/Modal';
import Input from '@component/form/Input';
import Button from '@component/form/Button';

interface VoucherSectionProps {
  children?: React.ReactNode;
}
const VoucherSectionDefaultProps = {};

function VoucherSection({ children }: VoucherSectionProps & typeof VoucherSectionDefaultProps) {
  const addModal = useModal();

  return (
    <>
      <Card marginBottom="2em">
        <CardHeader>
          <section className="title-label-section">
            <h3 className="title-label">소유권</h3>
            <Button
              leftIcon={faPlus}
              styles={{
                height: 'fit-content',
                theme: "primary",
                padding: "0.7em 1.3em",
                iconMargin: "1em"
              }}
              onClick={() => addModal.open()}
            >추가</Button>
          </section>
        </CardHeader>
        <CardBody>
          <p className="description">사용자에게 발급하려는 소유권의 종류와 수량을 지정합니다.</p>
        </CardBody>
      </Card>

      <Modal show={addModal.show} onClick={() => addModal.close()}>
        <Card>
          <CardBody>
            <p>TODO: 포토카드 선택할 수 있는 영역</p>
          </CardBody>
        </Card>
      </Modal>
    </>
  );
}

VoucherSection.defaultProps = VoucherSectionDefaultProps;
export default VoucherSection;