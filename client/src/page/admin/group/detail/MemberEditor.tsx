import React, { useState, useCallback } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import * as memberAPI from '@api/memberAPI';
import * as queryKey from '@util/queryKey';
import { ErrorType } from '@util/commonAPI';
import { AxiosError, AxiosResponse } from 'axios';
import Input from '@component/form/Input';
import InputMessage from '@component/form/InputMessage';
import Button from '@component/form/Button';
import TableBodyItem from '@component/table/TableBodyItem';

interface MemberEditorProps {
  groupId: number;
  memberId?: number | undefined;
  defaultValue?: string;
  closeEditor: () => void;
}

const MemberEditorDefaultProps = {
  defaultValue: ''
};

// 멤버 추가 or 수정 모드에 보여줄 컴포넌트
function MemberEditor({ groupId, memberId, defaultValue, closeEditor }: MemberEditorProps & typeof MemberEditorDefaultProps) {
  const [name, setName] = useState(defaultValue);
  const [message, setMessage] = useState('');
  const queryClient = useQueryClient();

  // 데이터 추가 요청
  const addMutation = useMutation(memberAPI.postMember.axios, {
    onSuccess: (res: AxiosResponse<typeof memberAPI.postMember.resType>) => {
      toast.success('새로운 멤버를 추가했어요.', { autoClose: 5000, position: toast.POSITION.TOP_CENTER });
      queryClient.invalidateQueries(queryKey.groupKeys.detail(groupId));
      closeEditor();
    },
    onError: (err: AxiosError<ErrorType>) => {
      if (err.response?.data.message) {
        toast.error(err.response?.data.message, { autoClose: 5000, position: toast.POSITION.BOTTOM_RIGHT });
        setMessage(err.response?.data.message);
      }
    }
  });

  // 데이터 수정 요청
  const modifyMutation = useMutation(memberAPI.putMember.axios, {
    onSuccess: (res: AxiosResponse<typeof memberAPI.putMember.resType>) => {
      toast.success(res.data?.message, { autoClose: 5000, position: toast.POSITION.TOP_CENTER });
      queryClient.invalidateQueries(queryKey.groupKeys.detail(groupId));
      closeEditor();
    },
    onError: (err: AxiosError<ErrorType>) => {
      if (err.response?.data.message) {
        toast.error(err.response?.data.message, { autoClose: 5000, position: toast.POSITION.BOTTOM_RIGHT });
        setMessage(err.response?.data.message);
      }
    }
  });

  // input 상태 값 변경
  const changeInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value), []);

  // 전송 이벤트
  const onSubmit = useCallback(() => {
    if (memberId) modifyMutation.mutate({ memberId, name }); // 수정 요청
    else addMutation.mutate({ groupId, name }); // 추가 요청
  }, [name, groupId, memberId, addMutation, modifyMutation]);

  return (
    <tr>
      <TableBodyItem styles={{ paddingLeft: "1em" }}>
        <Input
          type="text"
          name="name"
          value={name}
          placeholder={memberId ? '수정할 이름을 입력하세요' : '추가할 이름을 입력하세요'}
          autoComplete="off"
          onChange={changeInput}
          styles={{
            width: "100%",
            height: "2.5em"
          }}
        >
          <InputMessage styles={{margin: "0.5em 0 0 0.8em"}}>{message}</InputMessage>
        </Input>
      </TableBodyItem>
      <TableBodyItem></TableBodyItem>
      <TableBodyItem styles={{ paddingRight: "0.5em" }}>
        <section className="action-section">
          <Button 
            onClick={onSubmit}
            styles={{
              theme: "primary",
              padding: "0.7em 1em",
              marginRight: "0.5em"
            }}
          >저장</Button>
          <Button
            onClick={closeEditor}
            styles={{
              theme: "gray-outlined",
              padding: "0.7em 1em",
              marginRight: "0.5em"
            }}
           >취소</Button>
        </section>
      </TableBodyItem>
    </tr>
  );
}

MemberEditor.defaultProps = MemberEditorDefaultProps;

export default MemberEditor;