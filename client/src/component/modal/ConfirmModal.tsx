import React from 'react';
import styled from 'styled-components'
import Modal, { LocationType, StylesProps } from '@component/modal/basic/Modal';
import Button from '@component/form/Button';
import Card from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardBody from '@component/card/basic/CardBody';
import CardFooter from '@component/card/basic/CardFooter';
import { ButtonTheme } from '@component/form/Button';
import { ModalHookType } from '@hook/useModal';
import ModalHeader from './basic/ModalHeader';

// 모달 컴포넌트 =========================
interface ConfirmModalProps {
  hook: ModalHookType;
  titleName?: string;
  confirmText?: string;
  cancelText?: string;
  minWidth?: string;
  maxWidth?: string;
  location?: LocationType;
  handleConfirm?: () => void;
  confirmButtonTheme?: ButtonTheme;
  cancelButtonTheme?: ButtonTheme;
  styles?: StylesProps;
  children?: React.ReactNode;
}
const ConfirmModalDefaultProps = {
  titleName: '',
  confirmButtonTheme: 'danger',
  cancelButtonTheme: 'gray',
  confirmText: '확인',
  cancelText: '취소'
};
function ConfirmModal(p: ConfirmModalProps & typeof ConfirmModalDefaultProps) {
  return (
    <Modal
      hook={p.hook}
      location={p.location}
      styles={p.styles}
    >
      <Card minWidth={p.minWidth} maxWidth={p.maxWidth}>
        <CardHeader padding="1.25em">
          <ModalHeader titleName={p.titleName} handleClose={p.hook.close} />
        </CardHeader>
        <CardBody padding="1.25em">
          {p.children}
        </CardBody>
        <CardFooter padding="0 1.25em 1.25em 1.25em">
          {p.hook.errorMessage && <ErrorLabel>{p.hook.errorMessage}</ErrorLabel>}
          <ButtonSection>
            <Button
              onClick={p.handleConfirm}
              styles={{
                theme: p.confirmButtonTheme,
                padding: "0.7em"
              }}
              >{p.confirmText}</Button>
            <Button
              onClick={p.hook.close}
              styles={{
                theme: p.cancelButtonTheme,
                padding: "0.7em"
              }}
            >{p.cancelText}</Button>
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