import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ResType as GroupType } from '@api/query/group/useGroupQuery';
import useModal from '@component/new_modal/useModal';
import ConfirmModal from '@component/new_modal/ConfirmModal';
import RemoveCard from '@component/card/RemoveCard';
import useDeleteGroup from '@api/mutation/group/useDeleteGroup';

interface Props {
  group: GroupType;
  groupId: number;
}

function GroupRemove({ group, groupId }: Props) {
  const removeModal = useModal();
  const navigate = useNavigate();

  // 데이터 삭제 요청
  const deleteMutation = useDeleteGroup(groupId, res => navigate('/admin/group/list'));

  // 그룹 삭제
  const removeGroup = useCallback(() => {
    deleteMutation.mutate({ groupId });
  }, [deleteMutation, groupId]);

  return (
    <>
      <RemoveCard
        titleText="그룹 삭제"
        onClick={e => {
          e.stopPropagation();
          removeModal.open();
        }}
      >
        <p className="description">
          해당 그룹을 삭제하면 연관된 멤버와 포토카드도 모두 지워지니 신중히 삭제해주세요.
        </p>
      </RemoveCard>

      <ConfirmModal
        hook={removeModal}
        title="그룹 삭제"
        confirm={{ text: '삭제', buttonTheme: 'danger', onClick: removeGroup }}
      >
        <p className="text">이 그룹을 삭제하면 연관된 멤버와 포토카드도 함께 지워져요.</p>
        <p className="text">정말로 {group?.name} 그룹을 삭제하시겠어요?</p>
      </ConfirmModal>
    </>
  );
}

export default GroupRemove;
