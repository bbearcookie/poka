import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { ResType } from '@api/query/group/useGroupQuery';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Card from '@component/card/basic/Card';
import { CardHeader } from '@component/card/basic/_styles';
import Table from '@component/table/Table';
import Col from '@component/table/styles/Col';
import Button from '@component/form/Button';
import MemberEditor from './MemberEditor';
import MemberInfo from './MemberInfo';

interface Props {
  res: ResType;
}

function MemberList({ res }: Props) {
  // [true] 새로운 멤버를 작성중인 상태
  // [false] 아무런 수정도 하지 않는 상태
  // [멤버ID] 특정 멤버를 수정중인 상태
  const [editTarget, setEditTarget] = useState<number | boolean>(false);

  // 편집 모드 ON / OFF
  const startEditor = useCallback((target: number | true) => setEditTarget(target), []);
  const closeEditor = useCallback(() => setEditTarget(false), []);

  // 새 멤버 추가 버튼 클릭시
  const onClickAddMember = useCallback(() => startEditor(true), [startEditor]);

  return (
    <section>
      <Card styles={{ marginBottom: '5em' }}>
        <CardHeader>
          <h1 className="title">그룹의 멤버</h1>
        </CardHeader>
        <Table styles={{ itemPadding: '1.5em' }}>
          <colgroup>
            <Col width="40%" />
            <Col width="30%" />
            <Col width="30%" />
          </colgroup>
          <thead>
            <tr>
              <th>이름</th>
              <th>등록된 포토카드</th>
              <th>액션</th>
            </tr>
          </thead>
          <tbody>
            {res.members.map(m => {
              if (editTarget === m.memberId)
                return (
                  <MemberEditor
                    key={m.memberId}
                    {...m}
                    defaultValue={m.name}
                    closeEditor={closeEditor}
                  />
                );
              else return <MemberInfo key={m.memberId} {...m} startEditor={startEditor} />;
            })}
            {editTarget === true && (
              <MemberEditor groupId={res.groupId} memberId={null} closeEditor={closeEditor} />
            )}
          </tbody>
        </Table>

        <ButtonSection>
          {editTarget !== true && (
            <Button
              styles={{
                theme: 'primary',
                margin: '1.57em',
                padding: '0.7em 1em',
                iconMargin: '1em',
              }}
              leftIcon={faPlus}
              onClick={onClickAddMember}
            >
              추가
            </Button>
          )}
        </ButtonSection>
      </Card>
    </section>
  );
}

export default MemberList;

const ButtonSection = styled.section`
  display: flex;
  justify-content: flex-end;
`;
