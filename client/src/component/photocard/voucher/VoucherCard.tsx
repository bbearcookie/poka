import React from 'react';
import styled, { css } from 'styled-components';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import IconButton from '@component/form/IconButton';
import { VoucherType } from '@type/voucher';
import { VoucherStateKey, VoucherStateValue } from '@/type/voucher';
import PhotoCardTemplate from '@component/photocard/PhotoCardTemplate';

interface Props {
  showOwner: boolean;
  voucher: VoucherType;
  icon?: IconDefinition;
  handleClickIcon?: (voucherId: number) => void;
  styles?: StylesProps;
}
const DefaultProps = {
  showOwner: false,
  handleClickIcon: (voucherId: number) => {}
};

function VoucherCard({ showOwner = DefaultProps.showOwner, voucher, icon, handleClickIcon = DefaultProps.handleClickIcon }: Props) {
  return (
    <PhotoCardTemplate
      className="VoucherCard"
      photo={voucher}
      iconNode={icon && <IconButton icon={icon} size="lg" onClick={() => handleClickIcon(voucher.voucher_id)} />}
    >
      <VoucherStateLabel voucherState={voucher.state}>
        {VoucherStateValue[voucher.state.toUpperCase() as VoucherStateKey]}
      </VoucherStateLabel>
      {showOwner && <UserNameLabel><b>{voucher.username}</b></UserNameLabel>}
    </PhotoCardTemplate>
  );
}

export default VoucherCard;

interface StylesProps {
  voucherState: string;
  width?: string;
  margin?: string;
  textAlign?: string;
}
export const VoucherStateLabel = styled.p<StylesProps>`
  width: ${p => p.width};
  margin: ${p => p.margin ? p.margin : '0 0 0.2em 0'};
  text-align: ${p => p.textAlign};
  display: inline-block;
  padding: 0.3em;
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