import React, { Fragment } from 'react';
import { AxiosResponse } from 'axios';
import * as groupAPI from '@api/groupAPI';
import MemberEditor from './MemberEditor';
import MemberInfo from './MemberInfo';

interface MemberListProps {
  group: AxiosResponse<typeof groupAPI.getGroupDetail.resType>;
  groupId: number;
  editorTarget: number | boolean;
  startEditor: (idx: number | boolean) => void;
  closeEditor: () => void;
  children?: React.ReactNode;
}

const MemberListDefaultProps = {};

function MemberList({ group, groupId, editorTarget, startEditor, closeEditor, children }: MemberListProps & typeof MemberListDefaultProps) {
  return (
    <>
      {group?.data?.members.map((item, idx) => (
        <Fragment key={idx}>
          {editorTarget === idx && <MemberEditor groupId={groupId} memberId={item.member_id} defaultValue={item.name} closeEditor={closeEditor} />}
          {editorTarget !== idx && <MemberInfo idx={idx} name={item.name} photoCnt={item.photo_cnt} startEditor={() => startEditor(idx)} />}
        </Fragment>
      ))}

      {editorTarget === true && <MemberEditor groupId={groupId} closeEditor={closeEditor} />}
    </>
  );
}

MemberList.defaultProps = MemberListDefaultProps;

export default MemberList;