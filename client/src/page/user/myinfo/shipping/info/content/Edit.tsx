import IconButton from '@component/form/IconButton';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

interface Props {
  startEditor: () => void;
}

function Edit({ startEditor }: Props) {
  return (
    <IconButton
      width="1em"
      height="1em"
      icon={faEdit}
      tooltip="수정"
      styles={{ display: 'inline' }}
      onClick={startEditor}
    />
  );
}

export default Edit;
