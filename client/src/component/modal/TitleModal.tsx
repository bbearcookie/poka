import React from 'react';
import Modal, { Props as ModalProps } from '@component/modal/basic/Modal';
import Card from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardBody from '@component/card/basic/CardBody';
import ModalHeader from './basic/ModalHeader';

interface Props extends ModalProps {
  titleName?: string;
  children?: React.ReactNode;
}
const DefaultProps = {
  titleName: '',
};

function TitleModal({ hook, titleName = DefaultProps.titleName, location, styles, children }: Props) {
  return (
    <Modal
      hook={hook}
      location={location}
      styles={styles}
    >
      <Card>
        <CardHeader styles={{ padding: "1.25em" }}>
          <ModalHeader titleName={titleName} handleClose={hook.close} />
        </CardHeader>
        <CardBody styles={{ padding: "1.25em" }}>
          {children}
        </CardBody>
      </Card>
    </Modal>
  );
}

export default TitleModal;