import Modal, { Props as ModalProps } from '@component/new_modal/basic/Modal';
import { Card, CardBody } from '@component/card/basic/_styles';
import ModalHeader from '@component/new_modal/basic/ModalHeader';

export interface Props extends ModalProps {
  title?: string;
}

function TitleModal({ hook, title, children }: Props) {
  return (
    <Modal className="TitleModal" hook={hook}>
      <Card>
        <ModalHeader title={title} handleClose={hook.close} />
        <CardBody>{children}</CardBody>
      </Card>
    </Modal>
  );
}

export default TitleModal;
