import styled from 'styled-components';
import { CardHeader } from '@component/card/basic/_styles';
import TitleLabel from '@component/label/TitleLabel';
import IconButton from '@component/form/iconButton/IconButton';
import { faClose } from '@fortawesome/free-solid-svg-icons';

interface Props {
  title?: string;
  handleClose?: () => void;
}

function ModalHeader({ title, handleClose = () => {}, ...rest }: Props) {
  return (
    <CardHeader {...rest}>
      <TitleLabel title={title} />
      <IconButton iconProps={{ icon: faClose, size: '2x' }} onClick={handleClose} />
    </CardHeader>
  );
}

export default styled(ModalHeader)<Props>`
  display: flex;
  align-items: center;

  ${TitleLabel} {
    flex-grow: 1;
  }
`;
