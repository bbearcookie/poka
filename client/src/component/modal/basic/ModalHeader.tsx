import TitleLabel from '@component/label/titleLabel/TitleLabel';
import IconButton from '@component/form/iconButton/IconButton';
import { ModalHeader as StyledModalHeader } from './_styles';
import { faClose } from '@fortawesome/free-solid-svg-icons';

interface Props {
  title?: string;
  handleClose?: () => void;
}

function ModalHeader({ title, handleClose = () => {} }: Props) {
  return (
    <StyledModalHeader>
      <TitleLabel title={title} />
      <IconButton iconProps={{ icon: faClose, size: '2x' }} onClick={handleClose} />
    </StyledModalHeader>
  );
}

export default ModalHeader;
