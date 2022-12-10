import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { ErrorType } from '@util/request';
import { AxiosError } from 'axios';
import * as voucherAPI from '@api/voucherAPI';
import * as queryKey from '@util/queryKey';
import BackLabel from '@component/label/BackLabel';
import Success from './Success';
import './Index.scss';

interface IndexProps {
  children?: React.ReactNode;
}
const IndexDefaultProps = {};

function Index({ children }: IndexProps & typeof IndexDefaultProps) {
  const { voucherId } = useParams() as any;

  const { status, data: voucher, error } =
  useQuery<typeof voucherAPI.getVoucherDetail.resType, AxiosError<ErrorType>>
  (queryKey.voucherKeys.detail(voucherId), () => voucherAPI.getVoucherDetail.axios(voucherId));

  return (
    <div className="UserVoucherDetailPage">
      <BackLabel to="/voucher/list" styles={{ marginBottom: "2em" }}>소유권 목록</BackLabel>
      {status === 'success' && <Success voucher={voucher} />}
    </div>
  );
}

Index.defaultProps = IndexDefaultProps;
export default Index;