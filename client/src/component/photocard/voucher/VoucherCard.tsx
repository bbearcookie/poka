import React, { useCallback } from 'react';
import styled from 'styled-components';
import { IconType } from '@type/icon';
import IconButton from '@component/form/IconButton';
import StateLabel, { VoucherStateKey, VoucherStateValue } from '@component/label/StateLabel';
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
  icon?: IconType;
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
      iconNode={icon && <IconButton icon={icon.svg} tooltip={icon.tooltip} size="lg" onClick={onClick} />}
    >
      <StyledVoucherCard {...styles}>
        <section>
        <StateLabel state={{ type: "voucher", key: voucherState }} textAlign="start">
          {VoucherStateValue[voucherState]}
        </StateLabel>
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

const UserNameLabel = styled.p`
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`