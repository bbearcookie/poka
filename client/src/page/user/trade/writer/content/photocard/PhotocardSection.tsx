import React, { useCallback } from 'react';
import { useQueries } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import * as queryKey from '@api/queryKey';
import useModal from '@hook/useModal';
import TitleModal from '@component/modal/TitleModal';
import Card from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardBody from '@component/card/basic/CardBody';
import Button from '@component/form/Button';
import PhotoListWithFilter from '@component/list/new/photo/PhotoListWithFilter';
import PhotocardList from './PhotocardList';
import PhotocardAmount from './PhotocardAmount';
import { State as FormState, Action as FormAction } from '../../reducer';
import { fetchPhotoDetail } from '@api/api/photo';
import { ResType as PhotoResType } from '@api/query/photo/usePhotoQuery';

interface Props {
  form: FormState;
  formDispatch: React.Dispatch<FormAction>;
}

function PhotocardSection({ form, formDispatch }: Props) {
  const addModal = useModal();

  // 데이터 가져오기
  const photos = useQueries({
    queries: form.data.wantPhotocardIds.map((photocardId) => ({
      queryKey: queryKey.photoKeys.detail(photocardId),
      queryFn: async () => {
        return await fetchPhotoDetail(photocardId) as Promise<PhotoResType>
      } 
    }))
  });

  // 모달 열기
  const openModal = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    if (form.data.wantPhotocardIds.length >= 10)
      return toast.error('받으려는 포토카드는 최대 10종류만 선택할 수 있어요.', { autoClose: 2000, position: toast.POSITION.BOTTOM_RIGHT });
    addModal.open();
  }, [addModal, form]);

  // 받으려는 포토카드 추가
  const addWantPhotocardId = useCallback((photocardId: number) => {
    if (form.data.wantPhotocardIds.length >= 10)
      return toast.error('받으려는 포토카드는 최대 10종류만 선택할 수 있어요.', { autoClose: 2000, position: toast.POSITION.BOTTOM_RIGHT });
    formDispatch({ type: 'ADD_WANT_PHOTOCARD_ID', payload: photocardId });
    formDispatch({ type: 'SET_MESSAGE', target: 'wantPhotocardIds', value: '' });
    formDispatch({ type: 'SET_MESSAGE', target: 'amount', value: '' });
    addModal.close();
  }, [form, formDispatch, addModal]);

  // 받으려는 포토카드에서 제거
  const removeWantPhotocardId = useCallback((photocardId: number) => {
    formDispatch({ type: 'REMOVE_WANT_PHOTOCARD_ID', payload: photocardId });
  }, [formDispatch]);

  return (
    <>
      <Card styles={{ marginBottom: '5em' }}>
        <CardHeader>
          <section className="label-section">
            <h3 className="label">받을 포토카드</h3>
            <Button
              leftIcon={faAdd}
              styles={{
                height: 'fit-content',
                theme: "primary",
                padding: "0.7em 1.3em",
                iconMargin: "1em"
              }}
              onClick={openModal}
            >추가</Button>
          </section>
        </CardHeader>
        <CardBody>
          <PhotocardList form={form} formDispatch={formDispatch} photos={photos} removeWantPhotocardId={removeWantPhotocardId} />
          {photos.length > 0 && <PhotocardAmount form={form} formDispatch={formDispatch} />}
          <p className="description">타인으로부터 받기를 원하는 포토카드의 종류와 수량을 선택합니다.</p>
          <p className="description">최대 10종류를 선택할 수 있으며, 해당 종류 중에서 몇 가지가 충족되어야 자신의 소유권과 교환할 지를 지정합니다.</p>
          <p className="description">이는 가치가 높은 소유권을 등록할 때 여러 장의 포토카드를 받기 위함입니다.</p>
        </CardBody>
      </Card>

      <TitleModal hook={addModal} titleName="포토카드 선택" styles={{ width: '75%' }}>
        <PhotoListWithFilter icon={{ svg: faAdd }} handleSelect={addWantPhotocardId} />
      </TitleModal>
    </>
  );
}

export default PhotocardSection;