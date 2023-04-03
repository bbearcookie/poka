import { useCallback } from 'react';
import useVoucherQuery from '@api/query/voucher/useVoucherQuery';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { ModalHookType } from '@hook/useModal';
import { Card, CardHeader, CardBody } from '@component/card/basic/_styles';
import Button from '@component/form/Button';
import PhotoInfo from '@component/photocard/info/PhotoInfo';
import SkeletonPhotoInfo from '@component/photocard/info/SkeletonPhotoInfo';
import InputMessage from '@component/form/InputMessage';
import TitleLabel from '@component/label/titleLabel/TitleLabel';
import { getErrorMessage } from '@util/request';
import { State, Action } from '../../reducer';

interface Props {
  ableToChange?: boolean;
  modal: ModalHookType;
  state: State;
  dispatch: React.Dispatch<Action>;
}

function CardWrapper({ ableToChange, modal, state, dispatch }: Props) {
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
    <Card>
      <CardHeader>
        <TitleLabel title="등록할 소유권">
          {ableToChange && (
            <Button
              leftIcon={faAdd}
              styles={{
                height: 'fit-content',
                theme: 'primary',
                padding: '0.7em 1.3em',
                iconMargin: '1em',
              }}
              onClick={openModal}
            >
              선택
            </Button>
          )}
        </TitleLabel>
      </CardHeader>
      <CardBody>
        {status === 'success' && <PhotoInfo {...voucher.photo} styles={{ margin: '0 0 1em 0' }} />}
        {status === 'loading' && state.data.voucherId > 0 && <SkeletonPhotoInfo />}
        {state.message.voucherId && (
          <InputMessage styles={{ margin: '0 0 0.5em 0' }}>{state.message.voucherId}</InputMessage>
        )}
        <p className="description">타인과 교환하기를 원하는 소유권을 선택합니다.</p>
      </CardBody>
    </Card>
  );
}

export default CardWrapper;
