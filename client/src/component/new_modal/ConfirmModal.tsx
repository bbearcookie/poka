import React from 'react';
import Modal, { Props as ModalProps } from '@component/new_modal/basic/Modal';
import { Card, CardBody, CardFooter } from '@component/card/basic/_styles';
import ModalHeader from '@component/new_modal/basic/ModalHeader';
import { CSSProp } from 'styled-components';

interface Props extends ModalProps {
  title?: string;
  cssProp?: CSSProp;
}

function ConfirmModal({ hook, title, cssProp, children }: Props) {

  return (
    <Modal className="ConfirmModal" hook={hook}>
      <Card css={cssProp}>
        <ModalHeader title={title} handleClose={hook.close} />
        <CardBody>{children}</CardBody>
        <CardFooter>
          버튼영역~
        </CardFooter>
      </Card>
    </Modal>
  );
}

export default ConfirmModal;