import React, { useCallback } from 'react';
import { useQueries } from '@tanstack/react-query';
import { ResType as VoucherResType } from '@api/query/voucher/useVoucherQuery';
import { fetchVoucherDetail } from '@api/api/voucher';
import { faAdd, faClose } from '@fortawesome/free-solid-svg-icons';
import { ModalHook } from '@component/modal/useModal';
import VoucherItem from '@component/voucher/item/VoucherItem';
import SkeletonVoucherItem from '@component/voucher/item/SkeletonVoucherItem';
import { Card, CardHeader, CardBody } from '@component/card/basic/_styles';
import { InputMessage } from '@component/form/_styles';
import Button from '@component/form/Button';
import TitleLabel from '@component/label/titleLabel/TitleLabel';
import { ItemSection } from '@component/list/content/_styles';
import * as queryKey from '@api/queryKey';
import { State, Action } from '@page/user/shipping/writer/reducer';

interface Props {
  state: State;
  dispatch: React.Dispatch<Action>;
  modal: ModalHook;
}

function CardSection({ state, dispatch, modal }: Props) {
  // 소유권 정보
  const vouchers = useQueries({
    queries: state.data.voucherIds.map(voucherId => ({
      queryKey: queryKey.voucherKeys.detail(voucherId),
      queryFn: async () => {
        return (await fetchVoucherDetail(voucherId)) as Promise<VoucherResType>;
      },
    })),
  });
  const loading = vouchers.some(result => result.isLoading);

  // 소유권 선택 해제
  const onCancel = useCallback(
    (voucherId: number) => {
      dispatch({
        type: 'SET_VOUCHER_ID',
        voucherIds: state.data.voucherIds.filter(item => item !== voucherId),
      });
      dispatch({ type: 'SET_MESSAGE', target: 'voucherIds', value: '' });
    },
    [state, dispatch]
  );

  return (
    <Card css={{ marginBottom: '5em' }}>
      <CardHeader>
        <TitleLabel title="소유권 선택">
          <Button
            type="button"
            leftIcon={faAdd}
            iconMargin='1em'
            buttonTheme='primary'
            css={{
              height: 'fit-content',
              padding: '0.7em 1.3em',
            }}
            onClick={e => {
              e.stopPropagation();
              modal.open();
            }}
          >
            선택
          </Button>
        </TitleLabel>
      </CardHeader>
      <CardBody>
        <ItemSection templateColumnsSize="minmax(11.25em, 1fr)" marginBottom="2em">
          {loading &&
            Array.from({ length: 10 }).map((_, idx) => (
              <SkeletonVoucherItem key={idx} showOwner={false} />
            ))}
          {!loading &&
            vouchers.map(
              v =>
                v.status === 'success' && (
                  <VoucherItem
                    {...v.data}
                    key={v.data.voucherId}
                    showOwner={false}
                    voucherState={v.data.state}
                    icon={{ svg: faClose, tooltip: '취소' }}
                    onClick={onCancel}
                  />
                )
            )}
        </ItemSection>
        {state.message.voucherIds && (
          <InputMessage css={{ margin: '0 0 0.5em 0' }}>{state.message.voucherIds}</InputMessage>
        )}
        <p className="description">실물로 배송받으려는 소유권을 지정합니다.</p>
      </CardBody>
    </Card>
  );
}

export default CardSection;
