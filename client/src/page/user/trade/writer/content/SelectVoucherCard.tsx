import React, { useCallback } from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import useModal from '@hook/useModal';
import TitleModal from '@component/modal/TitleModal';
import PhotoListCard from '@component/list/photo/PhotoListCard';
import VoucherListCard from '@component/list/voucher/VoucherListCard';
import Card from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardBody from '@component/card/basic/CardBody';
import Button from '@component/form/Button';

interface SelectVoucherCardProps {
  children?: React.ReactNode;
}
const SelectVoucherCardDefaultProps = {};

function SelectVoucherCard({ children }: SelectVoucherCardProps & typeof SelectVoucherCardDefaultProps) {
  const addModal = useModal();

  return (
    <>
      <Card className="SelectVoucherCard">
        <CardHeader>
          <section className="label-section">
            <h3 className="label">등록할 포토카드</h3>
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
          <p className="description">가지고 있는 소유권 중에서 타인과 교환하기를 원하는 포토카드를 선택합니다.</p>
        </CardBody>
      </Card>

      <TitleModal hook={addModal} titleName="소유권 선택" styles={{ width: '75%' }}>
        <VoucherListCard
          icon={faPlus}
          handleClickIcon={(voucherId) => console.log(`TODO: ${voucherId} 선택!`)}
          defaultFilter={{
            owner: 'MINE',
            state: 'AVAILABLE'
          }}
          cardStyles={{ border: "none" }}
        />
      </TitleModal>
    </>
  );
}

SelectVoucherCard.defaultProps = SelectVoucherCardDefaultProps;
export default SelectVoucherCard;