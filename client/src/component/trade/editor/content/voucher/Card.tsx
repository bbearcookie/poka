import { useCallback } from 'react';
import useVoucherQuery from '@api/query/voucher/useVoucherQuery';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { ModalHook } from '@component/modal/useModal';
import { Card, CardHeader, CardBody } from '@component/card/basic/_styles';
import Button from '@component/form/button/Button';
import PhotoInfo from '@component/photocard/info/PhotoInfo';
import SkeletonPhotoInfo from '@component/photocard/info/SkeletonPhotoInfo';
import { InputMessage } from '@component/form/_styles';
import TitleLabel from '@component/label/TitleLabel';
import { getErrorMessage } from '@util/request';
import { State, Action } from '../../reducer';
import { CSSProp } from 'styled-components';

interface Props {
  ableToChange?: boolean;
  modal: ModalHook;
  state: State;
  dispatch: React.Dispatch<Action>;
  cssProp?: CSSProp;
}

function CardWrapper({ ableToChange, modal, state, dispatch, cssProp }: Props) {
  const { status, data: voucher } = useVoucherQuery(state.data.voucherId, {
    onError: err =>
      dispatch({ type: 'SET_MESSAGE', target: 'voucherId', value: getErrorMessage(err) }),
  });

  const openModal = useCallback(() => {
    setTimeout(() => {
      modal.open();
    }, 0);
  }, [modal]);

  return (
    <Card css={cssProp}>
      <CardHeader>
        <TitleLabel title="등록할 소유권">
          {ableToChange && (
            <Button
              buttonTheme='primary'
              leftIcon={faAdd}
              iconMargin='1em'
              css={{
                height: 'fit-content',
                theme: 'primary',
                padding: '0.7em 1.3em',
              }}
              onClick={openModal}
            >
              선택
            </Button>
          )}
        </TitleLabel>
      </CardHeader>
      <CardBody>
        {status === 'success' && <PhotoInfo {...voucher.photo} cssProp={{ marginBottom: '1em' }} />}
        {status === 'loading' && state.data.voucherId > 0 && <SkeletonPhotoInfo />}
        {state.message.voucherId && (
          <InputMessage css={{ margin: '0 0 0.5em 0' }}>{state.message.voucherId}</InputMessage>
        )}
        <p className="description">타인과 교환하기를 원하는 소유권을 선택합니다.</p>
      </CardBody>
    </Card>
  );
}

export default CardWrapper;
