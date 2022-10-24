import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { ErrorType } from '@util/commonAPI';
import { AxiosError } from 'axios';
import * as voucherAPI from '@api/voucherAPI';
import * as queryKey from '@util/queryKey';
import RemoveCard from '@component/card/RemoveCard';
import BackLabel from '@component/label/BackLabel';
import PhotoInfoCard from '@component/photocard/detail/PhotoInfoCard';
import VoucherInfo from './VoucherInfo';
import './Index.scss';

interface VoucherDetailPageProps {
  children?: React.ReactNode;
}
const VoucherDetailPageDefaultProps = {};

function VoucherDetailPage({ children }: VoucherDetailPageProps & typeof VoucherDetailPageDefaultProps) {
  const { voucherId } = useParams() as any;

  const { status, data: voucher, error } =
  useQuery<typeof voucherAPI.getVoucherDetail.resType, AxiosError<ErrorType>>
  (queryKey.voucherKeys.detail(voucherId), () => voucherAPI.getVoucherDetail.axios(voucherId));
  
  return (
    <div className="VoucherDetailPage">
      <BackLabel to="/admin/voucher/list" styles={{ marginBottom: "2em" }}>소유권 목록</BackLabel>
      {voucher &&
      <>
        <PhotoInfoCard photo={voucher} />
        <VoucherInfo voucher={voucher} />
      </>}
      <RemoveCard titleText="소유권 삭제">
        <p className="description">관리자가 소유권을 잘못 발급 했을 경우를 대비한 삭제 기능입니다.</p>
        <p className="description">이 기능을 사용할 경우는 드물며, 해당 소유권을 삭제하면 연관된 교환글도 모두 지워지니 신중히 삭제해주세요.</p>
      </RemoveCard>
    </div>
  );
}

VoucherDetailPage.defaultProps = VoucherDetailPageDefaultProps;
export default VoucherDetailPage;