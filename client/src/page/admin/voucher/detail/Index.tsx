import React from 'react';
import BackLabel from '@component/label/BackLabel';
import './Index.scss';

interface VoucherDetailPageProps {
  children?: React.ReactNode;
}
const VoucherDetailPageDefaultProps = {};

function VoucherDetailPage({ children }: VoucherDetailPageProps & typeof VoucherDetailPageDefaultProps) {
  return (
    <div className="VoucherDetailPage">
      <BackLabel to="/admin/voucher/list" styles={{ marginBottom: "2em" }}>소유권 목록</BackLabel>
      소유권 상세 페이지
    </div>
  );
}

VoucherDetailPage.defaultProps = VoucherDetailPageDefaultProps;
export default VoucherDetailPage;