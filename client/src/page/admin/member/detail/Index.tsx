import React, { useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { ErrorType } from '@util/request';
import * as memberAPI from '@api/memberAPI';
import * as queryKey from '@util/queryKey';
import BackLabel from '@component/label/BackLabel';
import ErrorCard from '@component/card/ErrorCard';
import Success from './Success';
import Loading from './Loading';
import './Index.scss';

interface Props {}
const DefaultProps = {};

function MemberDetailPage({  }: Props) {
  const { memberId } = useParams() as any;
  const { status, data: member, error } =
  useQuery<typeof memberAPI.getMemberDetail.resType, AxiosError<ErrorType>>
  (queryKey.memberKeys.detail(memberId), () => memberAPI.getMemberDetail.axios(memberId));
  const navigate = useNavigate();

  const toBackPage = useCallback(() => {
    return navigate(-1);
  }, [navigate]);

  return (
    <div className="MemberDetailPage">
      {member && member.group_id ?
        <BackLabel to={`/admin/group/detail/${member.group_id}`} styles={{ marginBottom: "2em" }}>{member.group_name}</BackLabel>
      : <BackLabel onClick={toBackPage} styles={{ marginBottom: "2em" }}>뒤로가기</BackLabel>}

      {status === 'success' && <Success member={member} memberId={memberId} />}
      {status === 'loading' && <Loading />}
      {status === 'error' && <ErrorCard error={error} />}
    </div>
  );
}

export default MemberDetailPage;