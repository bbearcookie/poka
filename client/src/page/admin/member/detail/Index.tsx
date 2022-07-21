import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { ErrorType } from '@util/commonAPI';
import * as memberAPI from '@api/memberAPI';
import * as queryKey from '@util/queryKey';
import Success from './Success';
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

  return (
    <div className="MemberDetailPage">
      {status === 'success' && <Success member={member} memberId={memberId} />}
    </div>
  );
}

MemberDetailPage.defaultProps = MemberDetailPageDefaultProps;
export default MemberDetailPage;