import React, { useState, useCallback } from 'react';
import { getErrorMessage } from '@util/request';
import useAddMember from '@api/mutation/member/useAddMember';
import useModifyMember from '@api/mutation/member/useModifyMember';
import Input from '@component/form/Input';
import { InputMessage } from '@component/form/_styles';
import Button from '@component/form/Button';
import { ButtonSection } from '@component/form/_styles';

interface Props {
  groupId: number;
  memberId: number | null;
  defaultValue?: string;
  closeEditor: () => void;
}

function MemberEditor({ memberId, groupId, defaultValue = '', closeEditor }: Props) {
  const [input, setInput] = useState(defaultValue);
  const [message, setMessage] = useState('');

  // 데이터 추가 요청
  const addMutation = useAddMember(
    groupId,
    res => closeEditor(),
    err => setMessage(getErrorMessage(err))
  );

  // 데이터 수정 요청
  const modifyMutation = useModifyMember(
    memberId || 0,
    res => closeEditor(),
    err => setMessage(getErrorMessage(err))
  );

  // input 상태 값 변경
  const changeInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value),
    []
  );

  // 전송 이벤트
  const onSubmit = useCallback(() => {
    // 수정 요청
    if (memberId) {
      modifyMutation.mutate({ name: input });
      // 추가 요청
    } else {
      addMutation.mutate({ name: input });
    }
  }, [input, memberId, addMutation, modifyMutation]);

  return (
    <tr>
      <td colSpan={2}>
        <Input
          type="text"
          name="name"
          value={input}
          placeholder={memberId ? '수정할 이름을 입력하세요' : '추가할 이름을 입력하세요'}
          autoComplete="off"
          onChange={changeInput}
          styles={{
            width: '100%',
            height: '2.5em',
          }}
        >
          <InputMessage css={{ margin: '0.5em 0 0 0.8em' }}>{message}</InputMessage>
        </Input>
      </td>
      <td>
        <ButtonSection>
          <Button
            onClick={onSubmit}
            buttonTheme="primary"
            css={{
              padding: '0.7em 1em',
            }}
          >
            저장
          </Button>
          <Button
            onClick={closeEditor}
            buttonTheme="gray-outlined"
            css={{
              padding: '0.7em 1em',
            }}
          >
            취소
          </Button>
        </ButtonSection>
      </td>
    </tr>
  );
}

export default MemberEditor;
