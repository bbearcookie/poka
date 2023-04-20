import { useAppSelector } from '@app/redux/store';
import { Link } from 'react-router-dom';
import TitleLabel from '@component/label/TitleLabel';
import TradeList from '@component/list/trade/TradeList';
import Button from '@component/form/button/Button';
import { ButtonSection } from '@component/form/_styles';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { StyledIndex } from './_styles';

function Index() {
  const { userId } = useAppSelector(state => state.auth);

  return (
    <StyledIndex>
      <TitleLabel title="내가 등록한 교환" css={{ marginBottom: '2em' }}>
        <ButtonSection>
          <Link to="/trade/writer">
            <Button buttonTheme="primary" leftIcon={faPen} iconMargin="1em">
              등록
            </Button>
          </Link>
        </ButtonSection>
      </TitleLabel>

      <TradeList
        location={{
          to: '/trade/detail',
          state: {
            prev: {
              url: '/trade/mine',
              text: '내 교환',
            },
          },
        }}
        filter={{ userId, state: 'trading' }}
      />
    </StyledIndex>
  );
}

export default Index;
