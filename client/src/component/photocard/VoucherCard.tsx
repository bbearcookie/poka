import React from 'react';
import styled, { css } from 'styled-components';
import PhotoCard from '@component/photocard/PhotoCard';
import { VoucherType } from '@api/voucherAPI';
import { VoucherStateType, VoucherStateName } from '@component/list/voucher/voucherListSlice';

interface VoucherCardProps {
  voucher: VoucherType;
  children?: React.ReactNode;
}
const VoucherCardDefaultProps = {};

function VoucherCard({ voucher, children }: VoucherCardProps & typeof VoucherCardDefaultProps) {
  return (
    <PhotoCard photo={voucher}>
      <VoucherStateLabel voucherState={voucher.state}>
        {VoucherStateName[voucher.state.toUpperCase() as VoucherStateType]}
      </VoucherStateLabel>
      <UserNameLabel><b>{voucher.username}</b></UserNameLabel>
    </PhotoCard>
  );
}

VoucherCard.defaultProps = VoucherCardDefaultProps;
export default VoucherCard;

const VoucherStateLabel = styled.p<{voucherState: string}>`
  display: inline-block;
  margin: 0 0 0.2em 0;
  padding: 0.2em;
  border-radius: 5px;

  ${(p) => {
    switch (p.voucherState.toUpperCase()) {
      case 'AVAILABLE':
        return css` background-color: #2196F3; color: white; `
      case 'TRADING':
        return css` background-color: #14B8A6; color: white; `
      case 'SHIPPING':
        return css` background-color: #E95188; color: white; `
      case 'SHIPPED':
        return css` background-color: #D14343; color: white; `
      default:
        return css``
    }
  }}
`
const UserNameLabel = styled.p`
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`