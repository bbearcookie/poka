import React, { useState, useCallback } from 'react';
import { getErrorMessage } from '@util/request';
import useAddMember from '@api/mutation/member/useAddMember';
import Input from '@component/form/Input';
import InputMessage from '@component/form/InputMessage';
import Button from '@component/form/Button';
import TableBodyItem from '@component/table/TableBodyItem';
import useModifyMember from '@api/mutation/member/useModifyMember';

interface Props {
  groupId: number;
  memberId?: number | undefined;
  defaultValue?: string;
  closeEditor: () => void;
}
const DefaultProps = {
  defaultValue: ''
};

// 멤버 추가 or 수정 모드에 보여줄 컴포넌트
function MemberEditor({ groupId, memberId, defaultValue = DefaultProps.defaultValue, closeEditor }: Props) {
  const [name, setName] = useState(defaultValue);
  const [message, setMessage] = useState('');

  // 데이터 추가 요청
  const addMutation = useAddMember(
    (res) => closeEditor(),
    (err) => setMessage(getErrorMessage(err))
  );

  // 데이터 수정 요청
  const modifyMutation = useModifyMember(
    (res) => closeEditor(),
    (err) => setMessage(getErrorMessage(err))
  );

  // input 상태 값 변경
  const changeInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value), []);

  // 전송 이벤트
  const onSubmit = useCallback(() => {

    // 수정 요청
    if (memberId) {
      modifyMutation.mutate({
        memberId,
        body: { name }
      });
    // 추가 요청
    } else {
      addMutation.mutate({
        groupId,
        body: { name }
      });
    }
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

export default MemberEditor;