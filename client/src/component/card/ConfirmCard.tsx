import React from 'react';
import styled from 'styled-components'
import Modal from '@component/modal/Modal';
import Card from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardBody from '@component/card/basic/CardBody';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

interface ConfirmCardProps {
  title: string;
  children?: React.ReactNode;
}

const ConfirmCardDefaultProps = {};

function ConfirmCard({ title, children }: ConfirmCardProps & typeof ConfirmCardDefaultProps) {
  return (
    <Modal>
      <Card>
        <CardHeader>
          <StyledHeader>
            <h1>{title}</h1>
            <FontAwesomeIcon icon={faClose} />
          </StyledHeader>
        </CardHeader>
        <CardBody>
          {children}
        </CardBody>
      </Card>
    </Modal>
  );
}

ConfirmCard.defaultProps = ConfirmCardDefaultProps;

export default ConfirmCard;

// 스타일 컴포넌트
const StyledHeader = styled.header`
  font-size: 2em;
`;