import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getErrorMessage } from '@util/request';
import useModal from '@component/modal/useModal';
import ConfirmModal from '@component/modal/ConfirmModal';
import RemoveCard from '@component/card/RemoveCard';
import { ResType as MemberType } from '@api/query/member/useMemberQuery';
import useDeleteMember from '@api/mutation/member/useDeleteMember';

interface Props {
  member: MemberType;
  memberId: number;
}

function MemberRemove({ member, memberId }: Props) {
  const removeModal = useModal();
  const navigate = useNavigate();

  // 데이터 삭제 요청
  const deleteMutation = useDeleteMember(
    memberId,
    res => navigate(`/admin/group/detail/${res.data.groupId}`),
    err => removeModal.setErrorMessage(getErrorMessage(err))
  );

  // 멤버 삭제
  const removeMember = useCallback(() => {
    deleteMutation.mutate({ memberId });
  }, [deleteMutation, memberId]);

  return (
    <section>
      <RemoveCard
        titleText="멤버 삭제"
        onClick={e => {
          e.stopPropagation();
          removeModal.open();
        }}
      >
        <p className="description">
          해당 멤버를 삭제하면 연관된 포토카드도 모두 지워지니 신중히 삭제해주세요.
        </p>
      </RemoveCard>

      <ConfirmModal
        hook={removeModal}
        title="멤버 삭제"
        confirm={{ text: '삭제', buttonTheme: "danger", onClick: removeMember }}
      >
        <p className="text">이 멤버를 삭제하면 연관된 포토카드도 함께 지워져요.</p>
        <p className="text">정말로 {member?.name} 멤버를 삭제하시겠어요?</p>
      </ConfirmModal>
    </section>
  );
}

export default MemberRemove;
