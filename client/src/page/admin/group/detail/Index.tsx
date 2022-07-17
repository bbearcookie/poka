import React, { useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import * as groupAPI from '@api/groupAPI';
import * as queryKey from '@util/queryKey';
import { BACKEND, ErrorType, getErrorMessage } from '@util/commonAPI';
import { AxiosError, AxiosResponse } from 'axios';
import WhiteCard, { WhiteCardBody, WhiteCardHeader } from '@component/card/WhiteCard';
import BackLabel from '@component/label/BackLabel';
import Button from '@component/form/Button';
import Table from '@component/table/Table';
import SkeletonItem from '@component/skeleton/SkeletonItem';
import MemberList from './MemberList';
import SkeletonMemberList from './SkeletonMemberList';
import MemberAddButton from './MemberAddButton';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import './Index.scss';

interface GroupDetailPageProps {
  children?: React.ReactNode;
}

const GroupDetailPageDefaultProps = {};

function GroupDetailPage({ children }: GroupDetailPageProps & typeof GroupDetailPageDefaultProps) {
  const { groupId } = useParams() as any;
  const { status, data: group, error } =
  useQuery<AxiosResponse<typeof groupAPI.getGroupDetail.resType>, AxiosError<ErrorType>>
  (queryKey.groupKeys.detail(groupId), groupAPI.getGroupDetail.axios(groupId));
  const [editorTarget, setEditorTarget] = useState<number | boolean>(false); // 수정 모드일 경우 현재 수정중인 memberId를 나타낸다.

  // 편집 모드 ON / OFF
  const startEditor = useCallback((target: number | boolean) => setEditorTarget(target), []);
  const closeEditor = useCallback(() => setEditorTarget(false), []);
  
  return (
    <div className="GroupDetailPage">
      <BackLabel to="/admin/group/list">그룹 목록</BackLabel>
      <section className="group-section">
        {status === 'loading' && 
        <>
          <SkeletonItem width="60px" height="60px" marginRight="1em" marginBottom="1.25em" />
          <div className="name-label"><SkeletonItem width="5em" /></div>
        </>}
        {status === 'success' &&
        <>
          <img src={`${BACKEND}/image/group/${group?.data?.image_name}`} width="60" height="60" alt={group?.data?.name} />
          <h1 className="name-label">{group?.data?.name}</h1>
        </>}
        <Button theme="primary-outlined" padding="0.7em 1.3em" iconMargin="1em" rightIcon={faPenToSquare}>수정</Button>
      </section>
      
      <WhiteCard>
        <WhiteCardBody><h2 className="card-label">그룹의 멤버</h2></WhiteCardBody>
        <Table>
          <thead>
            <tr>
              <th className="name">이름</th>
              <th className="photo">등록된 포토카드</th>
              <th className="action">액션</th>
            </tr>
          </thead>
          <tbody>
            {status === 'loading' && <SkeletonMemberList />}
            {status === 'success' && 
              <MemberList
                group={group}
                groupId={groupId}
                editorTarget={editorTarget}
                startEditor={startEditor}
                closeEditor={closeEditor}
              />
            }
            {status === 'error' && <tr><td>{getErrorMessage(error)}</td><td/><td/></tr>}
          </tbody>
        </Table>

        {editorTarget !== true && <MemberAddButton startEditor={() => startEditor(true)} />}
      </WhiteCard>

      <WhiteCard>
        <WhiteCardHeader><h3 className="card-label">그룹 삭제</h3></WhiteCardHeader>
        <WhiteCardBody>
          <Button className="remove-button" theme="danger-outlined" padding="0.7em 1.3em" iconMargin="1em" leftIcon={faTrashCan}>그룹 삭제</Button>
          <p className="description">해당 그룹을 삭제하면 연관된 멤버와 포토카드도 모두 지워지니 신중히 삭제해주세요.</p>
        </WhiteCardBody>
      </WhiteCard>
    </div>
  );
}

GroupDetailPage.defaultProps = GroupDetailPageDefaultProps;

export default GroupDetailPage;