import React from 'react';
import Modal, { Props as ModalProps } from '@component/modal/basic/Modal';
import { Card, CardHeader, CardBody } from '@component/card/basic/_styles';
import ModalHeader from './basic/ModalHeader';

interface Props extends ModalProps {
  titleName?: string;
  children?: React.ReactNode;
}

function TitleModal({ hook, location, titleName = '', styles, children }: Props) {
  return (
    <Modal hook={hook} location={location} styles={styles}>
      <Card>
        <CardHeader>
          <ModalHeader titleName={titleName} handleClose={hook.close} />
        </CardHeader>
        <CardBody>{children}</CardBody>
      </Card>
    </Modal>
  );
}

export default TitleModal;
