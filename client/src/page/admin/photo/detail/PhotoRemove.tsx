import React, { useCallback } from 'react';
import { AxiosResponse } from 'axios';
import * as photoAPI from '@api/photoAPI';
import useModal from '@hook/useModal';
import ConfirmModal from '@component/modal/ConfirmModal';
import RemoveCard from '@component/card/RemoveCard';

interface PhotoRemoveProps {
  photo: AxiosResponse<typeof photoAPI.getPhotoDetail.resType>;
  children?: React.ReactNode;
}
const PhotoRemoveDefaultProps = {};

function PhotoRemove({ photo, children }: PhotoRemoveProps & typeof PhotoRemoveDefaultProps) {
  const removeModal = useModal();

  // 포토카드 삭제
  const removePhotocard = useCallback(() => {

  }, []);

  return (
    <>
      <RemoveCard
        titleText="포토카드 삭제"
        onClick={removeModal.open}
      >
        <p className="description">해당 포토카드를 삭제하면 연관된 사용자의 소유권도 모두 지워지니 신중히 삭제해주세요.</p>
      </RemoveCard>

      <ConfirmModal
        hook={removeModal}
        maxWidth="100vh"
        location="CENTER_CENTER"
        titleName="포토카드 삭제"
        confirmText="삭제"
        handleConfirm={removePhotocard}
      >
        <p className="text">이 그룹을 삭제하면 연관된 사용자의 소유권도 함께 지워져요.</p>
        <p className="text">정말로 {photo.data?.name} 그룹을 삭제하시겠어요?</p>
      </ConfirmModal>
    </>
  );
}

PhotoRemove.defaultProps = PhotoRemoveDefaultProps;
export default PhotoRemove;