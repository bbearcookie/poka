import IconButton from '@component/form/iconButton/IconButton';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

interface Props {
  startEditor: () => void;
}

function Edit({ startEditor }: Props) {
  return (
    <IconButton
      iconProps={{ icon: faEdit, width: '1em', height: '1em' }}
      tooltip="수정"
      onClick={startEditor}
    />
  );
}

export default Edit;
