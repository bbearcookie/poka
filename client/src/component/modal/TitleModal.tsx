import React from 'react';
import Modal, { LocationType, StylesProps } from '@component/modal/basic/Modal';
import Card from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardBody from '@component/card/basic/CardBody';
import { ModalHookType } from '@hook/useModal';
import ModalHeader from './basic/ModalHeader';

interface TitleModalProps {
  hook: ModalHookType;
  titleName?: string;
  location?: LocationType;
  styles?: StylesProps;
  children?: React.ReactNode;
}
const TitleModalDefaultProps = {
  titleName: '',
};

function TitleModal({ hook, titleName, location, styles, children }: TitleModalProps & typeof TitleModalDefaultProps) {
  return (
    <Modal
      hook={hook}
      location={location}
      styles={styles}
    >
      <Card>
        <CardHeader padding="1.25em">
          <ModalHeader titleName={titleName} handleClose={hook.close} />
        </CardHeader>
        <CardBody padding="1.25em">
          {children}
        </CardBody>
      </Card>
    </Modal>
  );
}

TitleModal.defaultProps = TitleModalDefaultProps;
export default TitleModal;