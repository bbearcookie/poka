import React, { useState, useCallback, Fragment } from 'react';
import { AxiosResponse } from 'axios';
import * as groupAPI from '@api/groupAPI';
import Card from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardBody from '@component/card/basic/CardBody';
import Table from '@component/table/Table';
import TableHead from '@component/table/TableHead';
import TableHeadItem from '@component/table/TableHeadItem';
import TableBody from '@component/table/TableBody';
import MemberEditor from './MemberEditor';
import MemberInfo from './MemberInfo';
import MemberAddButton from './MemberAddButton';

interface MemberListProps {
  group: AxiosResponse<typeof groupAPI.getGroupDetail.resType>;
  groupId: number;
}

const MemberListDefaultProps = {};

function MemberList({ group, groupId }: MemberListProps & typeof MemberListDefaultProps) {
  const [editorTarget, setEditorTarget] = useState<number | boolean>(false); // 수정 모드일 경우 현재 수정중인 memberId를 나타낸다.

  // 편집 모드 ON / OFF
  const startEditor = useCallback((target: number | boolean) => setEditorTarget(target), []);
  const closeEditor = useCallback(() => setEditorTarget(false), []);

  return (
    <Card marginBottom="5em">
      <CardHeader><h1>그룹의 멤버</h1></CardHeader>
      <CardBody padding="0">
        <Table borderStyle="none" borderBottom="1px solid #E6E8F0">
          <TableHead height="3em">
            <tr>
              <TableHeadItem width="50%" paddingLeft="1.5em">이름</TableHeadItem>
              <TableHeadItem width="20%">등록된 포토카드</TableHeadItem>
              <TableHeadItem width="30%" paddingRight="1.5em" textAlign="right">액션</TableHeadItem>
            </tr>
          </TableHead>
          <TableBody height="5em">
            <>
              {group?.data?.members.map((item, idx) => (
                <Fragment key={idx}>
                  {editorTarget === idx && <MemberEditor groupId={groupId} memberId={item.member_id} defaultValue={item.name} closeEditor={closeEditor} />}
                  {editorTarget !== idx && <MemberInfo idx={idx} name={item.name} photoCnt={item.photo_cnt} startEditor={() => startEditor(idx)} />}
                </Fragment>
              ))}

              {editorTarget === true && <MemberEditor groupId={groupId} closeEditor={closeEditor} />}
            </>
          </TableBody>
        </Table>
      </CardBody>

      {editorTarget !== true && <MemberAddButton startEditor={() => startEditor(true)} />}
    </Card>
  );
}

MemberList.defaultProps = MemberListDefaultProps;

export default MemberList;