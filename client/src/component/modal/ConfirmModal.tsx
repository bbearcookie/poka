import React from 'react';
import styled from 'styled-components'
import Modal, { LocationType } from '@component/modal/basic/Modal';
import Button from '@component/form/Button';
import Card from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardBody from '@component/card/basic/CardBody';
import CardFooter from '@component/card/basic/CardFooter';
import { ButtonTheme } from '@component/form/Button';
import { ModalHookType } from '@hook/useModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

// 모달 컴포넌트 =========================
const CLASS = 'ConfirmModal';
interface ConfirmModalProps {
  titleName: string;
  hook: ModalHookType;
  confirmText?: string;
  cancelText?: string;
  minWidth?: string;
  maxWidth?: string;
  location?: LocationType;
  backdrop?: 'normal' | 'static'; // static: 모달 바깥 영역 클릭해도 모달이 닫히지 않음.
  handleConfirm?: () => void;
  confirmButtonTheme?: ButtonTheme;
  cancelButtonTheme?: ButtonTheme;
  children?: React.ReactNode;
}
const ConfirmModalDefaultProps = {
  location: {
    horizontal: 'CENTER',
    vertical: 'CENTER'
  },
  confirmButtonTheme: 'danger',
  cancelButtonTheme: 'gray',
  confirmText: '확인',
  cancelText: '취소',
  backdrop: 'normal'
};
function ConfirmModal(p: ConfirmModalProps & typeof ConfirmModalDefaultProps) {
  return (
    <Modal
      // 모달 보여주기 / 안보여주기
      hook={p.hook}
      // 모달 위치 지정
      location={p.location}
      // backdrop이 normal일 때만 바깥 영역 클릭시 모달 닫기
      {...(p.backdrop === 'normal' && { onClick: p.hook.close } )}
    >
      <Card minWidth={p.minWidth} maxWidth={p.maxWidth}>
        <CardHeader padding="1.25em">
          <StyledHeader {...p}>
            <h1 className={`${CLASS}__title-label`}>{p.titleName}</h1>
            <div className={`${CLASS}__icon-button`} onClick={p.hook.close}>
              <FontAwesomeIcon icon={faClose} />
            </div>
          </StyledHeader>
        </CardHeader>
        <CardBody padding="1.25em">
          {p.children}
        </CardBody>
        <CardFooter padding="0 1.25em 1.25em 1.25em">
          <StyledFooter {...p}>
            {p.hook.errorMessage && <p className={`${CLASS}__error-label`}>{p.hook.errorMessage}</p>}
            <section className={`${CLASS}__button-section`}>
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
            </section>
          </StyledFooter>
        </CardFooter>
      </Card>
    </Modal>
  );
}

ConfirmModal.defaultProps = ConfirmModalDefaultProps;
export default ConfirmModal;

// 스타일 컴포넌트 =========================
const StyledHeader = styled.header<ConfirmModalProps>`
  display: flex;
  align-items: center;
  font-size: 1.75em;

  .${CLASS}__title-label {
    margin: 0;
    flex-grow: 1;
  }

  .${CLASS}__icon-button {
    color: gray;
    padding: 0 0.5rem;
    border-radius: 0.3rem;
    transition: background-color 0.5s;
    cursor: pointer;
    user-select: none;

    &:hover {
      color: inherit;
      background-color: rgb(249, 249, 250);
    }
  }
`;

const StyledFooter = styled.footer<ConfirmModalProps>`
  .${CLASS}__error-label {
    color: red;
    text-align: right;
    margin: 1.25em 0 0 0;
  }

  .${CLASS}__button-section {
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;

    .Button {
      margin-left: 1em;
      margin-top: 1.25em;
    }
  }
`