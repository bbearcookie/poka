import React from 'react';
import Modal, { Props as ModalProps } from '@component/modal/basic/Modal';
import Card from '@component/card/basic/Card';
import CardHeader, { StylesProps as CardHeaderStyles } from '@component/card/basic/CardHeader';
import CardBody, { StylesProps as CardBodyStyles } from '@component/card/basic/CardBody';
import ModalHeader from './basic/ModalHeader';

interface Props extends ModalProps {
  titleName?: string;
  cardHeaderStyles?: CardHeaderStyles;
  cardBodyStyles?: CardBodyStyles;
  children?: React.ReactNode;
}
const DefaultProps = {
  titleName: '',
};

function TitleModal({
  hook, location,
  titleName = DefaultProps.titleName,
  styles, cardHeaderStyles, cardBodyStyles, children }: Props) {
  return (
    <Modal
      hook={hook}
      location={location}
      styles={styles}
    >
      <Card>
        <CardHeader styles={cardHeaderStyles}>
          <ModalHeader titleName={titleName} handleClose={hook.close} />
        </CardHeader>
        <CardBody styles={cardBodyStyles}>
          {children}
        </CardBody>
      </Card>
    </Modal>
  );
}

export default TitleModal;