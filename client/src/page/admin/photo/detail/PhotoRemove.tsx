import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { AxiosError, AxiosResponse } from 'axios';
import { ErrorType, getErrorMessage } from '@util/request';
import * as photoAPI from '@api/photoAPI';
import * as queryKey from '@util/queryKey';
import useModal from '@hook/useModal';
import ConfirmModal from '@component/modal/ConfirmModal';
import RemoveCard from '@component/card/RemoveCard';

interface Props {
  photo: typeof photoAPI.getPhotoDetail.resType;
  photocardId: number;
}
const DefaultProps = {};

function PhotoRemove({ photo, photocardId }: Props) {
  const removeModal = useModal();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // 데이터 삭제 요청
  const deleteMutation = useMutation(photoAPI.deletePhoto.axios, {
    onSuccess: (res: AxiosResponse<typeof photoAPI.deletePhoto.resType>) => {
      toast.warning(res.data?.message, { autoClose: 5000, position: toast.POSITION.TOP_CENTER });
      queryClient.invalidateQueries(queryKey.photoKeys.all);
      queryClient.invalidateQueries(queryKey.photoKeys.detail(photocardId));
      return navigate('/admin/photo/list');
    },
    onError: (err: AxiosError<ErrorType>) => {
      removeModal.setErrorMessage(getErrorMessage(err));
    }
  });

  // 포토카드 삭제
  const removePhotocard = useCallback(() => {
    deleteMutation.mutate({ photocardId });
  }, [deleteMutation, photocardId]);

  return (
    <>
      <RemoveCard
        titleText="포토카드 삭제"
        onClick={(e) => { e.stopPropagation(); removeModal.open(); }}
      >
        <p className="description">해당 포토카드를 삭제하면 연관된 사용자의 소유권도 모두 지워지니 신중히 삭제해주세요.</p>
      </RemoveCard>

      <ConfirmModal
        hook={removeModal}
        cardStyles={{ maxWidth: "100vh" }}
        titleName="포토카드 삭제"
        confirmText="삭제"
        handleConfirm={removePhotocard}
      >
        <p className="text">이 그룹을 삭제하면 연관된 사용자의 소유권도 함께 지워져요.</p>
        <p className="text">정말로 {photo?.name} 카드를 삭제하시겠어요?</p>
      </ConfirmModal>
    </>
  );
}

export default PhotoRemove;