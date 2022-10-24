import React from 'react';
import styled, { css } from 'styled-components';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import IconButton from '@component/form/IconButton';
import { VoucherType } from '@api/voucherAPI';
import { VoucherStateType, VoucherStateName } from '@component/list/voucher/voucherListSlice';
import PhotoCardTemplate from '@component/photocard/PhotoCardTemplate';

interface VoucherCardProps {
  voucher: VoucherType;
  icon?: IconDefinition;
  handleClickIcon?: (voucherId: number) => void;
  children?: React.ReactNode;
}
const VoucherCardDefaultProps = {
  handleClickIcon: (voucherId: number) => {}
};

function VoucherCard({ voucher, icon, handleClickIcon, children }: VoucherCardProps & typeof VoucherCardDefaultProps) {
  return (
    <PhotoCardTemplate
      className="VoucherCard"
      photo={voucher}
      iconNode={icon && <IconButton icon={icon} size="lg" onClick={() => handleClickIcon(voucher.voucher_id)} />}
    >
      <VoucherStateLabel voucherState={voucher.state}>
        {VoucherStateName[voucher.state.toUpperCase() as VoucherStateType]}
      </VoucherStateLabel>
      <UserNameLabel><b>{voucher.username}</b></UserNameLabel>
    </PhotoCardTemplate>
  );
}

VoucherCard.defaultProps = VoucherCardDefaultProps;
export default VoucherCard;

export const VoucherStateLabel = styled.p<{voucherState: string}>`
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