import React, { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import * as queryKey from '@api/queryKey';
import * as voucherAPI from '@api/voucherAPI';
import { AxiosError } from 'axios';
import { ErrorType } from '@util/request';
import { faClose, faAdd } from '@fortawesome/free-solid-svg-icons';
import useModal from '@hook/useModal';
import TitleModal from '@component/modal/TitleModal';
import PhotoCard from '@component/photocard/PhotoCard';
import SkeletonPhotoCard from '@component/photocard/skeleton/SkeletonPhotoCard';
import VoucherListCard from '@component/list/voucher/VoucherListCard';
import Card from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardBody from '@component/card/basic/CardBody';
import Button from '@component/form/Button';
import { State as FormState, Action as FormAction } from '../reducer';

interface Props {
  form: FormState;
  formDispatch: React.Dispatch<FormAction>;
}
const DefaultProps = {};

function VoucherSection({ form, formDispatch }: Props) {
  const addModal = useModal();

  const { status, data: voucher, error } =
  useQuery<typeof voucherAPI.getVoucherDetail.resType, AxiosError<ErrorType>>
  (queryKey.voucherKeys.detail(form.data.haveVoucherId), () => voucherAPI.getVoucherDetail.axios(form.data.haveVoucherId));

  // 사용할 소유권 선택
  const changeVoucherId = useCallback((voucherId: number) => {
    formDispatch({ type: 'SET_VOUCHER_ID', payload: voucherId });
    addModal.close();
  }, [formDispatch]);

  // 사용할 소유권 선택 해제
  const removeVoucherId = useCallback(() => {
    formDispatch({ type: 'SET_VOUCHER_ID', payload: 0 });
  }, [formDispatch]);

  return (
    <section className="VoucherSection">
      <Card styles={{ marginBottom: '5em' }}>
        <CardHeader>
          <section className="label-section">
            <h3 className="label">등록할 포토카드</h3>
            <Button
              leftIcon={faAdd}
              styles={{
                height: 'fit-content',
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
          <PhotoCard
            photo={voucher}
            icon={faClose}
            handleClickIcon={removeVoucherId}
            cardStyles={{ marginBottom: '1.5em' }}
          />}
          {status === 'loading' && form.data.haveVoucherId > 0 && <SkeletonPhotoCard cardStyles={{ marginBottom: '1.5em' }} />}
          <p className="description">자신이 가지고 있는 소유권 중에서 타인과 교환하기를 원하는 포토카드를 선택합니다.</p>
        </CardBody>
      </Card>

      <TitleModal hook={addModal} titleName="소유권 선택" styles={{ width: '75%' }}>
        <VoucherListCard
          icon={faAdd}
          handleClickIcon={changeVoucherId}
          defaultFilter={{
            owner: 'MINE',
            state: 'AVAILABLE'
          }}
          cardStyles={{ border: "none" }}
        />
      </TitleModal>
    </section>
  );
}

export default VoucherSection;