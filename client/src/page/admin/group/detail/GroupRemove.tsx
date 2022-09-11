import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { AxiosError, AxiosResponse } from 'axios';
import { ErrorType, getErrorMessage } from '@util/commonAPI';
import useModal from '@hook/useModal';
import * as groupAPI from '@api/groupAPI';
import * as queryKey from '@util/queryKey';
import ConfirmModal from '@component/modal/ConfirmModal';
import RemoveCard from '@component/card/RemoveCard';

interface GroupRemoveProps {
  group: typeof groupAPI.getGroupDetail.resType;
  groupId: number;
}
const GroupRemoveDefaultProps = {};

function GroupRemove({ group, groupId }: GroupRemoveProps & typeof GroupRemoveDefaultProps) {
  const removeModal = useModal();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // 데이터 삭제 요청
  const deleteMutation = useMutation(groupAPI.deleteGroup.axios, {
    onSuccess: (res: AxiosResponse<typeof groupAPI.deleteGroup.resType>) => {
      toast.warning(res.data?.message, { autoClose: 5000, position: toast.POSITION.TOP_CENTER });
      queryClient.invalidateQueries(queryKey.groupKeys.all);
      queryClient.invalidateQueries(queryKey.groupKeys.detail(groupId));
      return navigate('/admin/group/list');
    },
    onError: (err: AxiosError<ErrorType>) => {
      removeModal.setErrorMessage(getErrorMessage(err));
    }
  });

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
        maxWidth="100vh"
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

GroupRemove.defaultProps = GroupRemoveDefaultProps;
export default GroupRemove;