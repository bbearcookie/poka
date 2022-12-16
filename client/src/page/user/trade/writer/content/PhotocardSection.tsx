import React, { useCallback } from 'react';
import { useQueries, UseQueryResult, UseQueryOptions } from '@tanstack/react-query';
import { faAdd, faClose } from '@fortawesome/free-solid-svg-icons';
import * as queryKey from '@api/queryKey';
import * as photoAPI from '@api/photoAPI';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { ErrorType } from '@util/request';
import useModal from '@hook/useModal';
import TitleModal from '@component/modal/TitleModal';
import Card from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardBody from '@component/card/basic/CardBody';
import Select from '@component/form/Select';
import Button from '@component/form/Button';
import PhotoListCard from '@component/list/photo/PhotoListCard';
import { State as FormState, Action as FormAction } from '../reducer';
import PhotoCard from '@component/photocard/PhotoCard';

interface Props {
  form: FormState;
  formDispatch: React.Dispatch<FormAction>;
}
const DefaultProps = {};

function PhotocardSection({ form, formDispatch }: Props) {
  const addModal = useModal();

  // 데이터 가져오기
  const photos = useQueries({
    queries: form.data.wantPhotocardIds.map((photocardId) => ({
      queryKey: queryKey.groupKeys.detail(photocardId),
      queryFn: async () => {
        const data = await photoAPI.getPhotoDetail.axios(photocardId);
        return data;
      }
    }))
  });

  // 받으려는 포토카드 선택
  const addWantPhotocardId = useCallback((photocardId: number) => {
    formDispatch({ type: 'ADD_WANT_PHOTOCARD_ID', payload: photocardId });
    addModal.close();
  }, [formDispatch]);

  // 받으려는 포토카드에서 선택 해제
  const removeWantPhotocardId = useCallback((photocardId: number) => {
    formDispatch({ type: 'REMOVE_WANT_PHOTOCARD_ID', payload: photocardId });
  }, [formDispatch]);

  return (
    <section className="PhotocardSection">
      <Card>
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
              onClick={(e) => { e.stopPropagation(); addModal.open(); }}
            >선택</Button>
          </section>
        </CardHeader>
        <CardBody>
          <p className="description">타인으로부터 받기를 원하는 포토카드를 선택합니다.</p>
          <p className="description">최대 10가지를 선택할 수 있습니다.</p>
        </CardBody>
      </Card>

      <TitleModal hook={addModal} titleName="포토카드 선택" styles={{ width: '75%' }}>
        <PhotoListCard
          resetOnMount={true}
          icon={faAdd}
          handleClickIcon={addWantPhotocardId}
          cardStyles={{ border: "none" }}
        />
      </TitleModal>
    </section>
  );
}

export default PhotocardSection;