import styled from 'styled-components';
import Modal, { Props as ModalProps } from '@component/modal/basic/Modal';
import { Card, CardBody } from '@component/card/basic/_styles';
import ModalHeader from '@component/modal/basic/ModalHeader';

export interface Props extends ModalProps {
  title?: string;
}

function TitleModal({ hook, title, children, ...rest }: Props) {
  return (
    <Modal hook={hook}>
      <Card {...rest}>
        <ModalHeader title={title} handleClose={hook.close} />
        <CardBody>{children}</CardBody>
      </Card>
    </Modal>
  );
}

export default styled(TitleModal)<Props>``;
