import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { Photo } from '@type/photo';
import Button from '@component/form/button/Button';
import PhotoInfoComponent from '@component/photocard/info/PhotoInfo';

interface Props {
  photo: Photo;
  startEditor: () => void;
}

function PhotoInfo({ photo, startEditor }: Props) {
  return (
    <PhotoInfoComponent {...photo} cssProp={{ margin: '0 auto 5em auto' }}>
      <Button
        rightIcon={faPenToSquare}
        iconMargin='1em'
        buttonTheme="primary-outlined"
        css={{
          width: 'fit-content',
          padding: '0.7em 1.3em',
        }}
        onClick={startEditor}
      >
        수정
      </Button>
    </PhotoInfoComponent>
  );
}

export default PhotoInfo;
