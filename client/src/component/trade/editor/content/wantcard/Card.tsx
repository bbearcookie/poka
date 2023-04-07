import React, { useCallback } from 'react';
import { toast } from 'react-toastify';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { ModalHook } from '@component/modal/useModal';
import { Card, CardHeader, CardBody } from '@component/card/basic/_styles';
import Button from '@component/form/button/Button';
import TitleLabel from '@component/label/titleLabel/TitleLabel';
import { State, Action } from '@component/trade/editor/reducer';
import CardContents from './contents/CardContents';
import { CSSProp } from 'styled-components';

interface Props {
  modal: ModalHook;
  state: State;
  dispatch: React.Dispatch<Action>;
  cssProp?: CSSProp;
}

function CardWrapper({ modal, state, dispatch, cssProp }: Props) {
  const openModal = useCallback(() => {
    if (state.data.wantPhotocardIds.length >= 10)
      return toast.error('받으려는 포토카드는 최대 10종류만 선택할 수 있어요.', {
        autoClose: 2000,
        position: toast.POSITION.BOTTOM_RIGHT,
      });

    setTimeout(() => {
      modal.open();
    }, 0);
  }, [modal, state]);

  return (
    <Card css={cssProp}>
      <CardHeader>
        <TitleLabel title="받을 포토카드">
          <Button
            buttonTheme="primary"
            leftIcon={faAdd}
            iconMargin="1em"
            css={{
              height: 'fit-content',
              theme: 'primary',
              padding: '0.7em 1.3em',
            }}
            onClick={openModal}
          >
            추가
          </Button>
        </TitleLabel>
      </CardHeader>
      <CardBody>
        <CardContents state={state} dispatch={dispatch} />
        <p className="description">
          타인으로부터 받기를 원하는 포토카드의 종류와 수량을 선택합니다.
        </p>
        <p className="description">
          최대 10종류를 선택할 수 있으며, 해당 종류 중에서 몇 가지가 충족되어야 자신의 소유권과
          교환할 지를 지정합니다.
        </p>
        <p className="description">
          이는 가치가 높은 소유권을 등록할 때 여러 장의 포토카드를 받기 위함입니다.
        </p>
      </CardBody>
    </Card>
  );
}

export default CardWrapper;
