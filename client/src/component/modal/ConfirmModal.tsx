import React from 'react';
import styled from 'styled-components'
import Modal, { ModalProps, StylesProps as ModalStyles } from '@component/modal/basic/Modal';
import Button from '@component/form/Button';
import Card, { StylesProps as CardStyles } from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardBody from '@component/card/basic/CardBody';
import CardFooter from '@component/card/basic/CardFooter';
import { ButtonTheme } from '@component/form/Button';
import ModalHeader from './basic/ModalHeader';

interface ConfirmModalProps extends ModalProps {
  titleName?: string;
  confirmText?: string;
  confirmButtonTheme?: ButtonTheme;
  handleConfirm?: () => void;
  cancelText?: string;
  cancelButtonTheme?: ButtonTheme;
  cardStyles?: CardStyles;
  modalStyles?: ModalStyles;
  children?: React.ReactNode;
}
const ConfirmModalDefaultProps = {
  titleName: '',
  confirmButtonTheme: 'danger',
  cancelButtonTheme: 'gray',
  confirmText: '확인',
  cancelText: '취소'
};
function ConfirmModal({
  hook, location, titleName,
  confirmText, confirmButtonTheme, handleConfirm,
  cancelText, cancelButtonTheme, 
  cardStyles, modalStyles, children 
}: ConfirmModalProps & typeof ConfirmModalDefaultProps) {

  return (
    <Modal
      hook={hook}
      location={location}
      styles={modalStyles}
    >
      <Card styles={cardStyles}>
        <CardHeader styles={{ padding: "1.25em" }}>
          <ModalHeader titleName={titleName} handleClose={hook.close} />
        </CardHeader>
        <CardBody styles={{ padding: "1.25em" }}>
          {children}
        </CardBody>
        <CardFooter styles={{ padding: "0 1.25em 1.25em 1.25em"}}>
          {hook.errorMessage && <ErrorLabel>{hook.errorMessage}</ErrorLabel>}
          <ButtonSection>
            <Button
              onClick={handleConfirm}
              styles={{
                theme: confirmButtonTheme,
                padding: "0.7em"
              }}
              >{confirmText}</Button>
            <Button
              onClick={hook.close}
              styles={{
                theme: cancelButtonTheme,
                padding: "0.7em"
              }}
            >{cancelText}</Button>
          </ButtonSection>
        </CardFooter>
      </Card>
    </Modal>
  );
}

ConfirmModal.defaultProps = ConfirmModalDefaultProps;
export default ConfirmModal;

const ErrorLabel = styled.p`
  color: red;
  text-align: right;
  margin: 1.25em 0 0 0;
`

const ButtonSection = styled.section`
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;

  .Button {
    margin-left: 1em;
    margin-top: 1.25em;
  }
`