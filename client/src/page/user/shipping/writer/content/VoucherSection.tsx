import React, { useCallback } from 'react';
import useVoucherQuery from '@api/query/voucher/useVoucherQuery';
import { faAdd, faCheck } from '@fortawesome/free-solid-svg-icons';
import useModal from '@hook/useModal';
import TitleModal from '@component/modal/TitleModal';
import PhotoInfoCard from '@component/photocard/photo/PhotoInfoCard';
import SkeletonPhotoInfoCard from '@component/photocard/photo/SkeletonPhotoInfoCard';
import VoucherListCard from '@component/list/voucher/VoucherListCard';
import Card from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardBody from '@component/card/basic/CardBody';
import Button from '@component/form/Button';
import * as queryKey from '@api/queryKey';

interface Props {
  voucherId: number;
  setVoucherId: React.Dispatch<React.SetStateAction<number>>;
}
const DefaultProps = {};

function VoucherSection({ voucherId, setVoucherId }: Props) {
  const addModal = useModal();

  // 소유권 정보
  const { status, data: voucher, error } = useVoucherQuery(voucherId, {
    queryKey: queryKey.shippingKeys.writerVoucher(voucherId),
    refetchOnWindowFocus: false,
    retry: false,
    onError: (err) => {}
  });

  // 사용할 소유권 선택
  const onSelectVoucher = useCallback((id: number) => {
    setVoucherId(id);
    addModal.close();
  }, [addModal, setVoucherId]);

  return (
    <section className="voucher-section">
      <Card>
        <CardHeader>
          <section className="label-section">
            <h1 className="title">소유권 선택</h1>
            <Button
              leftIcon={faAdd}
              styles={{
                height: "fit-content",
                theme: "primary",
                padding: "0.7em 1.3em",
                iconMargin: "1em"
              }}
              onClick={(e) => { e.stopPropagation(); addModal.open(); }}
            >선택</Button>
          </section>
        </CardHeader>
        <CardBody>
          <p className="description">실물로 배송받으려는 소유권을 지정합니다.</p>
        </CardBody>
      </Card>

      <TitleModal hook={addModal} titleName="소유권 선택" styles={{ width: "75%" }}>
        <VoucherListCard
          icon={faCheck}
          handleClickIcon={onSelectVoucher}
          defaultFilter={{
            owner: "mine",
            state: "available"
          }}
          cardStyles={{ border: "none" }}
        />
      </TitleModal>
    </section>
  );
}

export default VoucherSection;