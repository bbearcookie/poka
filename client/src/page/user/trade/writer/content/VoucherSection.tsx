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
import InputMessage from '@component/form/InputMessage';
import { getErrorMessage } from '@util/request';
import * as queryKey from '@api/queryKey';
import { State as FormState, Action as FormAction } from '../reducer';

interface Props {
  form: FormState;
  formDispatch: React.Dispatch<FormAction>;
}
const DefaultProps = {};

function VoucherSection({ form, formDispatch }: Props) {
  const addModal = useModal();
  const { status, data: voucher, error } = useVoucherQuery(form.data.haveVoucherId, {
    queryKey: queryKey.tradeKeys.writerVoucher(form.data.haveVoucherId),
    refetchOnWindowFocus: false,
    retry: false,
    onError: (err) => {
      formDispatch({ type: "SET_MESSAGE", target: 'haveVoucherId', value: getErrorMessage(err) });
    }
  });

  // 사용할 소유권 선택
  const onSelectVoucher = useCallback((voucherId: number) => {
    formDispatch({ type: 'SET_VOUCHER_ID', payload: voucherId });
    formDispatch({ type: "SET_MESSAGE", target: 'haveVoucherId', value: '' });
    addModal.close();
  }, [formDispatch, addModal]);

  return (
    <section className="voucher-section">
      <Card>
        <CardHeader>
          <section className="label-section">
            <h3 className="label">등록할 소유권</h3>
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
          {status === 'success' && voucher &&
          <PhotoInfoCard
            photoName={voucher.name}
            groupName={voucher.groupName}
            memberName={voucher.memberName}
            imageName={voucher.imageName}
            cardStyles={{ boxShadow: "none", border: "none" }}
          />}
          {status === 'loading' && form.data.haveVoucherId > 0 && <SkeletonPhotoInfoCard cardStyles={{ boxShadow: "none", border: "none" }} />}
          {form.message.haveVoucherId && <InputMessage styles={{margin: "0 0 0.5em 0"}}>{form.message.haveVoucherId}</InputMessage>}
          <p className="description">타인과 교환하기를 원하는 소유권을 선택합니다.</p>
        </CardBody>
      </Card>

      <TitleModal hook={addModal} titleName="소유권 선택" styles={{ width: "75%" }}>
        <VoucherListCard
          icon={{ svg: faCheck, tooltip: "선택" }}
          handleClickIcon={onSelectVoucher}
          defaultFilter={{
            owner: "mine",
            state: "available",
            excludeVoucherId: []
          }}
          cardStyles={{ border: "none" }}
        />
      </TitleModal>
    </section>
  );
}

export default VoucherSection;