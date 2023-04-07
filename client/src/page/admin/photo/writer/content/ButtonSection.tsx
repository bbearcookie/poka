import { useCallback } from 'react';
import Button from '@component/form/button/Button';
import { useNavigate } from 'react-router-dom';
import { ButtonSection as StyledButtonSection } from '@component/form/_styles';

function ButtonSection() {
  const navigate = useNavigate();

  const handleCancel = useCallback(() => {
    navigate('/admin/photo/list');
  }, [navigate]);

  return (
    <StyledButtonSection>
      <Button
        buttonTheme="primary-outlined"
        css={{
          padding: '1em 2em',
        }}
        onClick={handleCancel}
      >
        취소
      </Button>
      <Button
        type="submit"
        buttonTheme='primary'
        css={{
          padding: '1em 2em',
        }}
      >
        작성
      </Button>
    </StyledButtonSection>
  );
}

export default ButtonSection;
