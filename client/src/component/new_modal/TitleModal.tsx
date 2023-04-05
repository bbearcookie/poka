import { CSSProp } from 'styled-components';
import Modal, { Props as ModalProps } from '@component/new_modal/basic/Modal';
import { Card, CardBody } from '@component/card/basic/_styles';
import ModalHeader from '@component/new_modal/basic/ModalHeader';

export interface Props extends ModalProps {
  title?: string;
  cssProp?: CSSProp;
}

function TitleModal({ hook, title, cssProp, children }: Props) {
  return (
    <Modal hook={hook}>
      <Card css={cssProp}>
        <ModalHeader title={title} handleClose={hook.close} />
        <CardBody>{children}</CardBody>
      </Card>
    </Modal>
  );
}

export default TitleModal;
