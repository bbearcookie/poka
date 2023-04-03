import React, { useCallback } from 'react';
import Card from '@component/card/basic/Card';
import { CardHeader } from '@component/card/basic/_styles';
import CardBody from '@component/card/basic/CardBody';
import { ModalHookType } from '@hook/useModal';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import TitleLabel from '@component/label/titleLabel/TitleLabel';
import Button from '@component/form/Button';
import AddressEditor from '@component/shipping/address/editor/AddressEditor';
import { State, Action } from '@component/shipping/address/editor/reducer';

interface Props {
  modal: ModalHookType;
  state: State;
  dispatch: React.Dispatch<Action>;
}

function AddressCard({ modal, state, dispatch }: Props) {

  // 모달 열기
  const openModal = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    modal.open();
  }, [modal]);

  return (
    <Card styles={{ marginBottom: "5em" }}>
      <CardHeader>
        <TitleLabel title="배송지 입력">
          <Button
            leftIcon={faAdd}
            styles={{
              height: "fit-content",
              theme: "primary",
              padding: "0.7em 1em",
              iconMargin: "1em"
            }}
            onClick={openModal}
          >가져오기</Button>
        </TitleLabel>
      </CardHeader>
      <CardBody styles={{ padding: "0" }}>
        <AddressEditor state={state} dispatch={dispatch} showName={false} />
      </CardBody>
      <CardBody>
        <p className="description">물품이 도착할 주소를 지정합니다.</p>
      </CardBody>
    </Card>
  );
}

export default AddressCard;