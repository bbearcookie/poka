import { Link } from 'react-router-dom';
import TitleLabel from '@component/label/titleLabel/TitleLabel';
import useIdolSelector from '@component/selector/useIdolSelector';
import IdolSelector from '@component/selector/IdolSelector';
import TradeList from '@component/list/trade/TradeList';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import Button from '@component/form/Button';
import './Index.scss';
import { useAppSelector } from '@app/redux/reduxHooks';

function Index() {
  const { userId } = useAppSelector(state => state.auth);
  const selector = useIdolSelector();

  return (
    <main className="TradeSearchPage">
      <TitleLabel title="교환 찾기" styles={{ marginBottom: '2em' }} />
      <IdolSelector hook={selector} />

      <section className="add-button-section">
        <Link to="/trade/writer">
          <Button
            leftIcon={faPen}
            styles={{ theme: 'primary', marginBottom: '2em', iconMargin: '1em' }}
          >
            등록
          </Button>
        </Link>
      </section>

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
    </main>
  );
}

export default Index;
