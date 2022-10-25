import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { AxiosError, AxiosResponse } from 'axios';
import { ErrorType, getErrorMessage } from '@util/commonAPI';
import useModal from '@hook/useModal';
import * as memberAPI from '@api/memberAPI';
import * as queryKey from '@util/queryKey';
import ConfirmModal from '@component/modal/ConfirmModal';
import RemoveCard from '@component/card/RemoveCard';

interface MemberRemoveProps {
  member: typeof memberAPI.getMemberDetail.resType;
  memberId: number;
}
const MemberRemoveDefaultProps = {};

function MemberRemove({ member, memberId }: MemberRemoveProps & typeof MemberRemoveDefaultProps) {
  const removeModal = useModal();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // 데이터 삭제 요청
  const deleteMutation = useMutation(memberAPI.deleteMember.axios, {
    onSuccess: (res: AxiosResponse<typeof memberAPI.deleteMember.resType>) => {
      toast.warning(res.data?.message, { autoClose: 5000, position: toast.POSITION.TOP_CENTER });
      queryClient.invalidateQueries(queryKey.memberKeys.all);
      queryClient.invalidateQueries(queryKey.memberKeys.detail(memberId));
      queryClient.invalidateQueries(queryKey.groupKeys.all);
      if (member?.group_id) queryClient.invalidateQueries(queryKey.groupKeys.detail(member.group_id));
      return navigate(`/admin/group/detail/${member?.group_id}`);
    },
    onError: (err: AxiosError<ErrorType>) => {
      removeModal.setErrorMessage(getErrorMessage(err));
    }
  })

  // 멤버 삭제
  const removeMember = useCallback(() => {
    deleteMutation.mutate({ memberId });
  }, [deleteMutation, memberId]);

  return (
    <>
      <RemoveCard
        titleText="멤버 삭제"
        onClick={(e) => { e.stopPropagation(); removeModal.open(); }}
      >
        <p className="description">해당 멤버를 삭제하면 연관된 포토카드도 모두 지워지니 신중히 삭제해주세요.</p>
      </RemoveCard>

      <ConfirmModal
        hook={removeModal}
        maxWidth="100vh"
        titleName="멤버 삭제"
        confirmText="삭제"
        handleConfirm={removeMember}
      >
        <p className="text">이 멤버를 삭제하면 연관된 포토카드도 함께 지워져요.</p>
        <p className="text">정말로 {member?.name} 멤버를 삭제하시겠어요?</p>
      </ConfirmModal>
    </>
  );
}

MemberRemove.defaultProps = MemberRemoveDefaultProps;
export default MemberRemove;