import { Link } from 'react-router-dom';
import { useAppSelector } from '@app/redux/store';
import TitleLabel from '@component/label/TitleLabel';
import useIdolSelector from '@component/selector/useIdolSelector';
import IdolSelector from '@component/selector/IdolSelector';
import TradeList from '@component/list/trade/TradeList';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import Button from '@component/form/button/Button';
import { ButtonSection } from '@component/form/_styles';
import { StyledIndex } from './_styles';

function Index() {
  const { userId } = useAppSelector(state => state.auth);
  const selector = useIdolSelector();

  return (
    <StyledIndex>
      <TitleLabel title="교환 찾기" css={{ marginBottom: '2em' }} />
      <IdolSelector hook={selector} />

      <ButtonSection>
        <Link to="/trade/writer">
          <Button
            buttonTheme="primary"
            leftIcon={faPen}
            iconMargin="1em"
            css={{ marginBottom: '2em' }}
          >
            등록
          </Button>
        </Link>
      </ButtonSection>

      <TradeList
        location={{
          to: '/trade/detail',
          state: {
            prev: {
              url: '/trade/search',
              text: '교환 찾기',
            },
          },
        }}
        filter={{ ...selector, state: 'trading', excludeUserId: userId }}
      />
    </StyledIndex>
  );
}

export default Index;
