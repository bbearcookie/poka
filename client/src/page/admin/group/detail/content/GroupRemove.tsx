import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useModal from '@hook/useModal';
import { ResType as GroupType } from '@api/query/group/useGroupQuery';
import ConfirmModal from '@component/modal/ConfirmModal';
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
  const deleteMutation = useDeleteGroup((res) => navigate('/admin/group/list'));

  // 그룹 삭제
  const removeGroup = useCallback(() => {
    deleteMutation.mutate({groupId});
  }, [deleteMutation, groupId]);

  return (
    <>
      <RemoveCard
        titleText="그룹 삭제"
        onClick={(e) => { e.stopPropagation(); removeModal.open(); }}
      >
        <p className="description">해당 그룹을 삭제하면 연관된 멤버와 포토카드도 모두 지워지니 신중히 삭제해주세요.</p>
      </RemoveCard>

      <ConfirmModal
        hook={removeModal}
        cardStyles={{ maxWidth: "100vh" }}
        location={{ vertical: 'CENTER', horizontal: 'CENTER' }}
        titleName="그룹 삭제"
        confirmText="삭제"
        handleConfirm={removeGroup}
      >
        <p className="text">이 그룹을 삭제하면 연관된 멤버와 포토카드도 함께 지워져요.</p>
        <p className="text">정말로 {group?.name} 그룹을 삭제하시겠어요?</p>
      </ConfirmModal>
    </>
  );
}

export default GroupRemove;