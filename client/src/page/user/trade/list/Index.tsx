import { Link } from 'react-router-dom';
import TitleLabel from '@component/label/titleLabel/TitleLabel';
import useIdolSelector from '@component/selector/useIdolSelector';
import IdolSelector from '@component/selector/IdolSelector';
import TradeSection from './content/TradeSection';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import TradeItem from '@component/trade/item/TradeItem';
import Button from '@component/form/Button';
import './Index.scss';

function Index() {
  const selector = useIdolSelector();

  return (
    <main className="TradeListPage">
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

      <TradeItem
        to="/trade/detail/34"
        photo={{
          name: 'FANCY YOU',
          groupData: {
            name: 'TWICE',
            groupId: 17,
          },
          imageName: '39_1659339397868.png',
          memberData: {
            name: '나연',
            memberId: 23,
          },
          photocardId: 39,
        }}
        author={{
          userId: 2,
          nickname: '테스터',
          username: 'testman',
          imageName: '2_1679325353420.jpg',
        }}
        tradeState="trading"
        writtenTime="2023-03-21T06:13:08.000Z"
      />

      <TradeSection {...selector} />
    </main>
  );
}

export default Index;
