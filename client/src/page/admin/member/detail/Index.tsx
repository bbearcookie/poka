import React, { useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useMemberQuery from '@api/query/member/useMemberQuery';
import BackLabel from '@component/label/BackLabel';
import ErrorCard from '@component/card/ErrorCard';
import Success from './Success';
import Loading from './Loading';
import './Index.scss';

interface Props {}
const DefaultProps = {};

function MemberDetailPage({  }: Props) {
  const { memberId } = useParams() as any;
  const { status, data: member, error } = useMemberQuery(memberId);
  const navigate = useNavigate();

  const toBackPage = useCallback(() => {
    return navigate(-1);
  }, [navigate]);

  return (
    <div className="MemberDetailPage">
      {member && member.groupId ?
        <BackLabel to={`/admin/group/detail/${member.groupId}`} styles={{ marginBottom: "2em" }}>{member.groupName}</BackLabel>
      : <BackLabel onClick={toBackPage} styles={{ marginBottom: "2em" }}>뒤로가기</BackLabel>}

      {status === 'success' && <Success member={member} memberId={memberId} />}
      {status === 'loading' && <Loading />}
      {status === 'error' && <ErrorCard error={error} />}
    </div>
  );
}

export default MemberDetailPage;