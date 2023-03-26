import React, { useCallback } from 'react';
import useVoucherQuery from '@api/query/voucher/useVoucherQuery';
import * as queryKey from '@api/queryKey';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { ModalHookType } from '@hook/useModal';
import PhotoInfo from '@component/photocard/info/PhotoInfo';
import SkeletonPhotoInfo from '@component/photocard/info/SkeletonPhotoInfo';
import Card from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardBody from '@component/card/basic/CardBody';
import { ItemSection } from '@component/list/content/_styles';
import Button from '@component/form/Button';
import InputMessage from '@component/form/InputMessage';
import { getErrorMessage } from '@util/request';
import { State as FormState, Action as FormAction } from '../../reducer';

interface Props {
  form: FormState;
  formDispatch: React.Dispatch<FormAction>;
  addModal: ModalHookType;
}

function CardSection({ form, formDispatch, addModal }: Props) {
  const {
    status,
    data: voucher,
    error,
  } = useVoucherQuery(form.data.haveVoucherId, {
    queryKey: queryKey.tradeKeys.writerVoucher(form.data.haveVoucherId),
    refetchOnWindowFocus: false,
    retry: false,
    onError: err => {
      formDispatch({
        type: 'SET_MESSAGE',
        target: 'haveVoucherId',
        value: getErrorMessage(err),
      });
    },
  });

  const openModal = useCallback(() => {
    setTimeout(() => {
      addModal.open();
    }, 0);
  }, [addModal]);

  return (
    <Card>
      <CardHeader>
        <section className="label-section">
          <h3 className="label">등록할 소유권</h3>
          <Button
            leftIcon={faAdd}
            styles={{
              height: 'fit-content',
              theme: 'primary',
              padding: '0.7em 1.3em',
              iconMargin: '1em',
            }}
            onClick={openModal}>
            선택
          </Button>
        </section>
      </CardHeader>
      <CardBody>
        <ItemSection>
          {status === 'success' && voucher && (
            <PhotoInfo
              {...voucher.photo}
              imgStyles={{ size: 0.7 }}
              styles={{ margin: '0 0 1em 0' }}
            />
          )}
          {status === 'loading' && form.data.haveVoucherId > 0 && (
            <SkeletonPhotoInfo imgStyles={{ size: 0.7 }} />
          )}
        </ItemSection>
        {form.message.haveVoucherId && (
          <InputMessage styles={{ margin: '0 0 0.5em 0' }}>
            {form.message.haveVoucherId}
          </InputMessage>
        )}
        <p className="description">
          타인과 교환하기를 원하는 소유권을 선택합니다.
        </p>
      </CardBody>
    </Card>
  );
}

export default CardSection;
