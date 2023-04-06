import Button from '@component/form/Button';

interface Props {
  handleCancel?: () => void;
  handleSubmit?: () => void;
}

function Buttons({ handleCancel, handleSubmit }: Props) {
  return (
    <footer className="button-section">
      <Button
        buttonTheme="primary-outlined"
        css={{
          width: 'fit-content',
          margin: '1em 1em 0 0',
          padding: '0.7em 1.3em',
          iconMargin: '1em',
        }}
        onClick={handleCancel}
      >
        취소
      </Button>
      <Button
        css={{
          width: 'fit-content',
          marginTop: '1em',
          padding: '0.7em 1.3em',
          iconMargin: '1em',
        }}
        onClick={handleSubmit}
      >
        저장
      </Button>
    </footer>
  );
}

export default Buttons;
