import React, { useCallback } from 'react';
import styled, { css } from 'styled-components';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import IconButton from '@component/form/IconButton';
import { VoucherType } from '@type/voucher';
import { VoucherStateKey, VoucherStateValue } from '@/type/voucher';
import PhotoCardTemplate from '@component/photocard/PhotoCardTemplate';

interface Props {
  showOwner: boolean;
  voucherId: number;
  voucherState: VoucherStateKey;
  username: string;
  photoName: string;
  memberName: string;
  groupName: string;
  imageName: string;
  icon?: IconDefinition;
  handleClickIcon?: (voucherId: number) => void;
  styles?: StylesProps;
  children?: React.ReactNode;
}
const DefaultProps = {
  showOwner: false,
  handleClickIcon: (voucherId: number) => {}
};

function VoucherCard({
  showOwner = DefaultProps.showOwner,
  voucherId, voucherState, photoName, groupName, memberName, imageName, username,
  icon, handleClickIcon = DefaultProps.handleClickIcon, styles, children }
: Props) {

  const onClick = useCallback(() => {
    handleClickIcon(voucherId)
  }, [handleClickIcon, voucherId]);

  return (
    <PhotoCardTemplate
      className="VoucherCard"
      photoName={photoName}
      memberName={memberName}
      imageName={imageName}
      groupName={groupName}
      iconNode={icon && <IconButton icon={icon} size="lg" onClick={onClick} />}
    >
      <StyledVoucherCard {...styles}>
        <section>
          <VoucherStateLabel voucherState={voucherState}>
            {VoucherStateValue[voucherState as VoucherStateKey]}
          </VoucherStateLabel>
        </section>
        {showOwner && <UserNameLabel><b>{username}</b></UserNameLabel>}
        {children}
      </StyledVoucherCard>
    </PhotoCardTemplate>
  );
}

export default VoucherCard;

interface StylesProps {
  flexDirection?: "row" | "row-reverse" | "column" | "column-reverse";
}
const StyledVoucherCard = styled.div<StylesProps>`
  display: flex;
  flex-direction: ${p => p.flexDirection ? p.flexDirection : "column"};
`

export const VoucherStateLabel = styled.p<{
  voucherState: VoucherStateKey;
  width?: string;
  margin?: string;
  textAlign?: string;
}>`
  width: ${p => p.width};
  margin: ${p => p.margin ? p.margin : '0 0 0.2em 0'};
  text-align: ${p => p.textAlign};
  display: inline-block;
  padding: 0.3em;
  border-radius: 5px;

  ${(p) => {
    switch (p.voucherState) {
      case 'available':
        return css` background-color: #2196F3; color: white; `
      case 'trading':
        return css` background-color: #14B8A6; color: white; `
      case 'shipping':
        return css` background-color: #E95188; color: white; `
      case 'shipped':
        return css` background-color: #D14343; color: white; `
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