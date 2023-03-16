import React, { useCallback } from 'react';
import { useQueries } from '@tanstack/react-query';
import { ResType as VoucherResType } from '@api/query/voucher/useVoucherQuery';
import { fetchVoucherDetail } from '@api/api/voucher';
import { faAdd, faClose } from '@fortawesome/free-solid-svg-icons';
import { ModalHookType } from '@hook/useModal';
import VoucherCard from '@component/photocard/voucher/VoucherCard';
import SkeletonVoucherCard from '@component/photocard/voucher/SkeletonVoucherCard';
import Card from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardBody from '@component/card/basic/CardBody';
import InputMessage from '@component/form/InputMessage';
import Button from '@component/form/Button';
import TitleLabel from '@component/label/titleLabel/TitleLabel';
import { ItemSection } from '@component/list/content/_styles';
import * as queryKey from '@api/queryKey';
import { State, Action } from '../../reducer';

interface Props {
  state: State;
  dispatch: React.Dispatch<Action>;
  modal: ModalHookType;
}

function CardSection({ state, dispatch, modal }: Props) {

  // 소유권 정보
  const vouchers = useQueries({
    queries: state.data.voucherIds.map(voucherId => ({
      queryKey: queryKey.voucherKeys.detail(voucherId),
      queryFn: async () => {
        return await fetchVoucherDetail(voucherId) as Promise<VoucherResType>
      },
    }))
  });
  const loading = vouchers.some((result) => result.isLoading);

  // 소유권 선택 해제
  const onCancel = useCallback((voucherId: number) => {
    dispatch({ type: 'SET_VOUCHER_ID', voucherIds: state.data.voucherIds.filter(item => item !== voucherId)});
    dispatch({ type: 'SET_MESSAGE', target: 'voucherIds', value: ''});
  }, [state, dispatch]);

  return (
    <Card styles={{ marginBottom: '5em' }}>
      <CardHeader>
        <TitleLabel title="소유권 선택">
          <Button
            leftIcon={faAdd}
            styles={{
              height: "fit-content",
              theme: "primary",
              padding: "0.7em 1.3em",
              iconMargin: "1em"
            }}
            onClick={(e) => { e.stopPropagation(); modal.open(); }}
          >선택</Button>
        </TitleLabel>
      </CardHeader>
      <CardBody>
        <ItemSection marginBottom="2em">
          {loading && Array.from({ length: 10 }).map((_, idx) => <SkeletonVoucherCard key={idx} />)}
          {!loading && vouchers.map(voucher => voucher.status === "success" &&
          <VoucherCard
            key={voucher.data.voucherId}
            showOwner={false}
            voucherId={voucher.data.voucherId}
            photoName={voucher.data.name}
            groupName={voucher.data.groupData.name}
            memberName={voucher.data.memberData.name}
            imageName={voucher.data.imageName}
            username={voucher.data.username}
            voucherState={voucher.data.state}
            icon={{ svg: faClose, tooltip: '취소' }}
            handleClick={onCancel}
          />)}
        </ItemSection>
        {state.message.voucherIds && <InputMessage styles={{ margin: "0 0 0.5em 0" }}>{state.message.voucherIds}</InputMessage>}
        <p className="description">실물로 배송받으려는 소유권을 지정합니다.</p>
      </CardBody>
    </Card>
  );
}

export default CardSection;