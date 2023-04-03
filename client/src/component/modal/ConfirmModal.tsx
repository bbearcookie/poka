import React from 'react';
import styled from 'styled-components';
import Modal, {
  Props as ModalProps,
  StylesProps as ModalStyles,
} from '@component/modal/basic/Modal';
import Button from '@component/form/Button';
import { Card, CardHeader, CardBody, CardFooter } from '@component/card/basic/_styles';
import { ButtonTheme } from '@component/form/Button';
import ModalHeader from './basic/ModalHeader';

interface Props extends ModalProps {
  titleName?: string;
  confirmText?: string;
  confirmButtonTheme?: ButtonTheme;
  handleConfirm?: () => void;
  cancelText?: string;
  cancelButtonTheme?: ButtonTheme;
  modalStyles?: ModalStyles;
  children?: React.ReactNode;
}

function ConfirmModal({
  hook,
  location,
  titleName = '',
  confirmText = '확인',
  confirmButtonTheme = 'danger',
  handleConfirm,
  cancelText = '취소',
  cancelButtonTheme = 'gray',
  modalStyles,
  children,
}: Props) {
  return (
    <Modal hook={hook} location={location} styles={modalStyles}>
      <Card>
        <CardHeader>
          <ModalHeader titleName={titleName} handleClose={hook.close} />
        </CardHeader>
        <CardBody>{children}</CardBody>
        <CardFooter>
          {hook.errorMessage && <ErrorLabel>{hook.errorMessage}</ErrorLabel>}
          <ButtonSection>
            <Button
              onClick={handleConfirm}
              styles={{
                theme: confirmButtonTheme,
                padding: '0.7em',
              }}
            >
              {confirmText}
            </Button>
            <Button
              onClick={hook.close}
              styles={{
                theme: cancelButtonTheme,
                padding: '0.7em',
              }}
            >
              {cancelText}
            </Button>
          </ButtonSection>
        </CardFooter>
      </Card>
    </Modal>
  );
}

export default ConfirmModal;

const ErrorLabel = styled.p`
  color: red;
  text-align: right;
  margin: 1.25em 0 0 0;
`;

const ButtonSection = styled.section`
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;

  .Button {
    margin-left: 1em;
    margin-top: 1.25em;
  }
`;
