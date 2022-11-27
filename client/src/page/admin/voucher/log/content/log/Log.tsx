import React from 'react';
import styled, { css } from 'styled-components';
import { useQuery } from 'react-query';
import { ErrorType } from '@util/request';
import { AxiosError } from 'axios';
import * as userAPI from '@api/userAPI';
import * as queryKey from '@util/queryKey';
import { LogType } from '@api/voucherAPI';
import { getFormattedTime } from '@util/common';
import Issued from '../Issued';
import Traded from '../Traded';

interface LogProps {
  log: LogType;
  children?: React.ReactNode;
}
const LogDefaultProps = {};

function Log({ log, children }: LogProps & typeof LogDefaultProps) {
  const originUser =
  useQuery<typeof userAPI.getUserDetail.resType, AxiosError<ErrorType>>
  (queryKey.userKeys.profile(log.origin_user_id), () => userAPI.getUserDetail.axios(log.origin_user_id));

  return (
    <li className="log">
      <div className="line">
        <div className="subtitle">내용</div>
        <div className="body">
          <LogTypeLabel type={log.type}>{LogTypeText[log.type]}</LogTypeLabel>
        </div>
      </div>
      <div className="line">
        <div className="subtitle">시간</div>
        <div className="body">{getFormattedTime(log.logged_time)}</div>
      </div>
      {['issued', 'shipped'].includes(log.type) && <Issued originUser={originUser.data} /> }
      {log.type === 'traded' && <Traded log={log} originUser={originUser.data} />}
    </li>
  );
}

Log.defaultProps = LogDefaultProps;
export default Log;

const LogTypeText = {
  'issued': '발급',
  'traded': '교환',
  'shipped': '배송'
}

const LogTypeLabel = styled.p<{ type: string; }>`
  display: inline-block;
  margin: 0 0 0.2em 0;
  padding: 0.4em;
  border-radius: 5px;

  ${(p) => {
    switch (p.type) {
      case 'issued':
        return css` background-color: #2196F3; color: white; `
      case 'traded':
        return css` background-color: #14B8A6; color: white; `
      case 'shipped':
        return css` background-color: #E95188; color: white; `
      default:
        return css``
    }
  }}
`