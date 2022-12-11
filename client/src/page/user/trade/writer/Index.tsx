import React, { useCallback } from 'react';
import qs from 'qs';
import { useQuery } from 'react-query';
import { ErrorType } from '@util/request';
import { AxiosError } from 'axios';
import * as voucherAPI from '@api/voucherAPI';
import * as queryKey from '@util/queryKey';
import Card from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardBody from '@component/card/basic/CardBody';
import BackLabel from '@component/label/BackLabel';
import SelectVoucherCard from './content/SelectVoucherCard';
import './Index.scss';

interface IndexProps {
  children?: React.ReactNode;
}
const IndexDefaultProps = {};

function Index({ children }: IndexProps & typeof IndexDefaultProps) {
  const querystring = qs.parse(window.location.search, { ignoreQueryPrefix: true });
  const voucherId = Number(querystring.voucherId) || 0;

  // const { status, data: voucher, error } =
  // useQuery<typeof voucherAPI.getVoucherDetail.resType, AxiosError<ErrorType>>
  // (queryKey.voucherKeys.detail(voucherId), () => voucherAPI.getVoucherDetail.axios(voucherId));

  const onSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
  }, []);

  return (
    <div className="TradeWriterPage">
      {voucherId !== 0 && <BackLabel to={`/voucher/detail/${voucherId}`} styles={{ marginBottom: "2em" }}>소유권</BackLabel>}
      <h1 className="title-label">교환글 등록</h1>
      <form onSubmit={onSubmit}>
        {/* <SelectCard /> */}
        <SelectVoucherCard />
      </form>
    </div>
  );
}

Index.defaultProps = IndexDefaultProps;
export default Index;