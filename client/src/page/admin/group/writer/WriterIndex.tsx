import TitleLabel from '@component/label/TitleLabel';
import Form from './Form';
import './Index.scss';

function Index() {
  return (
    <main className="GroupWriterPage">
      <TitleLabel title="그룹 등록" css={{ marginBottom: "1em" }} />
      <Form />
    </main>
  );
}

export default Index;