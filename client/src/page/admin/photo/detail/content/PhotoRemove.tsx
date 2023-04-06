import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getErrorMessage } from '@util/request';
import useDeletePhoto from '@api/mutation/photo/useDeletePhoto';
import useModal from '@component/new_modal/useModal';
import ConfirmModal from '@component/new_modal/ConfirmModal';
import RemoveCard from '@component/card/RemoveCard';
import { ResType as PhotoResType } from '@api/query/photo/usePhotoQuery';

interface Props {
  photo: PhotoResType;
  photocardId: number;
}

function PhotoRemove({ photo, photocardId }: Props) {
  const removeModal = useModal();
  const navigate = useNavigate();

  // 데이터 삭제 요청
  const deleteMutation = useDeletePhoto(
    photocardId,
    res => navigate('/admin/photo/list'),
    err => removeModal.setErrorMessage(getErrorMessage(err))
  );

  // 포토카드 삭제
  const removePhotocard = useCallback(() => {
    deleteMutation.mutate({ photocardId });
  }, [deleteMutation, photocardId]);

  return (
    <>
      <RemoveCard
        titleText="포토카드 삭제"
        onClick={e => {
          e.stopPropagation();
          removeModal.open();
        }}
      >
        <p className="description">
          해당 포토카드를 삭제하면 연관된 사용자의 소유권도 모두 지워지니 신중히 삭제해주세요.
        </p>
      </RemoveCard>

      <ConfirmModal
        hook={removeModal}
        title="포토카드 삭제"
        confirm={{ text: '삭제', buttonTheme: "danger", onClick: removePhotocard }}
      >
        <p className="text">이 그룹을 삭제하면 연관된 사용자의 소유권도 함께 지워져요.</p>
        <p className="text">정말로 {photo?.name} 카드를 삭제하시겠어요?</p>
      </ConfirmModal>
    </>
  );
}

export default PhotoRemove;
