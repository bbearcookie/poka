import { useCallback } from 'react';
import Button from '@component/form/Button';
import { useNavigate } from 'react-router-dom';
import { StyledButtonSection } from './_styles';

function ButtonSection() {
  const navigate = useNavigate();

  const handleCancel = useCallback(() => {
    navigate('/admin/photo/list');
  }, [navigate]);

  return (
    <StyledButtonSection>
      <Button
        styles={{
          theme: 'primary-outlined',
          padding: '1em 2em',
          marginLeft: '1em',
        }}
        onClick={handleCancel}
      >
        취소
      </Button>
      <Button
        type="submit"
        styles={{
          theme: 'primary',
          padding: '1em 2em',
          marginLeft: '1em',
        }}
      >
        작성
      </Button>
    </StyledButtonSection>
  );
}

export default ButtonSection;
