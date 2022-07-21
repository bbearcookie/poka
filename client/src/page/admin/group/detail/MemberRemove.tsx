import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { AxiosError, AxiosResponse } from 'axios';
import { getErrorMessage } from '@util/commonAPI';
import * as groupAPI from '@api/groupAPI';
import * as queryKey from '@util/queryKey';
import ConfirmModal from '@component/modal/ConfirmModal';
import Card from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardBody from '@component/card/basic/CardBody';
import Button from '@component/form/Button';
import useModal from '@hook/useModal';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { ErrorType } from '@util/commonAPI';

interface MemberRemoveProps {
  group: AxiosResponse<typeof groupAPI.getGroupDetail.resType>;
  groupId: number;
}

const MemberRemoveDefaultProps = {};

function MemberRemove({ group, groupId }: MemberRemoveProps & typeof MemberRemoveDefaultProps) {
  const removeModal = useModal();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // 데이터 삭제 요청
  const deleteMutation = useMutation(groupAPI.deleteGroup.axios, {
    onSuccess: (res: AxiosResponse<typeof groupAPI.deleteGroup.resType>) => {
      toast.success(res.data?.message, { autoClose: 5000, position: toast.POSITION.TOP_CENTER });
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
    deleteMutation.mutate(groupId);
  }, [deleteMutation, groupId]);

  return (
    <>
      <Card>
        <CardHeader><h1>그룹 삭제</h1></CardHeader>
        <CardBody>
          <Button
            theme="danger-outlined"
            marginBottom="1em"
            padding="0.7em 1.3em"
            iconMargin="1em"
            leftIcon={faTrashCan}
            onClick={removeModal.open}
          >
            그룹 삭제
          </Button>
          <p className="description">해당 그룹을 삭제하면 연관된 멤버와 포토카드도 모두 지워지니 신중히 삭제해주세요.</p>
        </CardBody>
      </Card>

      <ConfirmModal
        hook={removeModal}
        maxWidth="100vh"
        location="CENTER_CENTER"
        titleName="그룹 삭제"
        confirmText="삭제"
        handleConfirm={removeGroup}
      >
        <p className="text">이 그룹을 삭제하면 연관된 멤버와 포토카드도 함께 지워져요.</p>
        <p className="text">정말로 {group.data?.name} 그룹을 삭제하시겠어요?</p>
      </ConfirmModal>
    </>
  );
}

MemberRemove.defaultProps = MemberRemoveDefaultProps;
export default MemberRemove;