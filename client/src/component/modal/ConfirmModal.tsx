import React from 'react';
import styled from 'styled-components'
import Modal from '@component/modal/basic/Modal';
import Button from '@component/form/Button';
import Card from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardBody from '@component/card/basic/CardBody';
import CardFooter from '@component/card/basic/CardFooter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

// 모달 컴포넌트 =========================
const CLASS = 'ConfirmModal';

interface ConfirmModalProps {
  titleName: string;
  minWidth?: string;
  maxWidth?: string;
  onRemove?: () => void;
  onClose?: () => void;
  children?: React.ReactNode;
}

const ConfirmModalDefaultProps = {};

function ConfirmModal(p: ConfirmModalProps & typeof ConfirmModalDefaultProps) {
  return (
    <Modal>
      <Card minWidth={p.minWidth} maxWidth={p.maxWidth}>
        <CardHeader padding="1em">
          <StyledHeader {...p}>
            <h1 className={`${CLASS}__title-label`}>{p.titleName}</h1>
            <div className={`${CLASS}__icon-button`} onClick={p.onClose}>
              <FontAwesomeIcon icon={faClose} />
            </div>
          </StyledHeader>
        </CardHeader>
        <CardBody>
          {p.children}
        </CardBody>
        <CardFooter padding="0 1em 1em 1em">
          <StyledFooter {...p}>
            <Button theme="danger" padding="0.7em" onClick={p.onRemove}>삭제</Button>
            <Button theme="gray" padding="0.7em" onClick={p.onClose}>취소</Button>
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
  font-size: 1.75em;
  align-items: center;

  .${CLASS}__title-label {
    margin: 0;
    flex-grow: 1;
  }

  .${CLASS}__icon-button {
    color: gray;
    padding: 0 0.5rem;
    border-radius: 0.3rem;
    transition: all 0.5s;
    cursor: pointer;
    user-select: none;

    &:hover {
      color: inherit;
      background-color: rgb(249, 249, 250);
    }
  }
`;

const StyledFooter = styled.footer<ConfirmModalProps>`
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;

  .Button {
    margin-left: 1em;
    margin-top: 1em;
  }
`