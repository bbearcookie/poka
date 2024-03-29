import React, { useCallback } from 'react';
import { Card, CardHeader, CardBody } from '@component/card/basic/_styles';
import { ModalHook } from '@component/modal/useModal';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import TitleLabel from '@component/label/TitleLabel';
import Button from '@component/form/button/Button';
import AddressEditor from '@component/shipping/address/editor/AddressEditor';
import { State, Action } from '@component/shipping/address/editor/reducer';

interface Props {
  modal: ModalHook;
  state: State;
  dispatch: React.Dispatch<Action>;
}

function AddressCard({ modal, state, dispatch }: Props) {
  // 모달 열기
  const openModal = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      modal.open();
    },
    [modal]
  );

  return (
    <Card css={{ marginBottom: '5em' }}>
      <CardHeader>
        <TitleLabel title="배송지 입력">
          <Button
            type="button"
            buttonTheme='primary'
            leftIcon={faAdd}
            iconMargin='1em'
            css={{
              height: 'fit-content',
              padding: '0.7em 1em',
            }}
            onClick={openModal}
          >
            가져오기
          </Button>
        </TitleLabel>
      </CardHeader>
      <AddressEditor state={state} dispatch={dispatch} showName={false} />
      <CardBody>
        <p className="description">물품이 도착할 주소를 지정합니다.</p>
      </CardBody>
    </Card>
  );
}

export default AddressCard;
