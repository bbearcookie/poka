import React, { useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { ErrorType } from '@util/commonAPI';
import * as memberAPI from '@api/memberAPI';
import * as queryKey from '@util/queryKey';
import BackLabel from '@component/label/BackLabel';
import ErrorCard from '@component/card/ErrorCard';
import Success from './Success';
import Skeleton from './Skeleton';
import './Index.scss';

interface MemberDetailPageProps {
  children?: React.ReactNode;
}
const MemberDetailPageDefaultProps = {};

function MemberDetailPage({ children }: MemberDetailPageProps & typeof MemberDetailPageDefaultProps) {
  const { memberId } = useParams() as any;
  const { status, data: member, error } =
  useQuery<AxiosResponse<typeof memberAPI.getMemberDetail.resType>, AxiosError<ErrorType>>
  (queryKey.memberKeys.detail(memberId), memberAPI.getMemberDetail.axios(memberId));
  const navigate = useNavigate();

  const toBackPage = useCallback(() => {
    return navigate(-1);
  }, [navigate]);


  return (
    <div className="MemberDetailPage">
      {member && member.data?.group_id ?
        <BackLabel to={`/admin/group/detail/${member.data.group_id}`} styles={{ marginBottom: "2em" }}>{member.data.group_name}</BackLabel>
      : <BackLabel onClick={toBackPage} styles={{ marginBottom: "2em" }}>뒤로가기</BackLabel>}

      {status === 'loading' && <Skeleton />}
      {status === 'success' && <Success member={member} memberId={memberId} />}
      {status === 'error' && <ErrorCard error={error} />}
    </div>
  );
}

MemberDetailPage.defaultProps = MemberDetailPageDefaultProps;
export default MemberDetailPage;