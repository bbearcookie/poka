import SkeletonItem from '@component/skeleton/SkeletonItem';
import { Card, CardHeader, CardBody } from '@component/card/basic/_styles';

function Loading() {
  return (
    <>
      <section className="name-section">
        <SkeletonItem styles={{ width: '5em', height: '2em', marginBottom: '0.5em' }} />
        <SkeletonItem styles={{ width: '8em', height: '1.2em' }} />

        <Card css={{ marginBottom: '5em' }}>
          <CardHeader>
            <section className="title-section">
              <h3 className="title-label">등록된 포토카드</h3>
            </section>
          </CardHeader>
          <CardBody>
            <SkeletonItem styles={{ width: '5em', height: '1.4em' }} />
          </CardBody>
        </Card>

        <Card css={{ marginBottom: '5em' }}>
          <CardHeader>
            <section className="title-section">
              <h3 className="title-label">멤버 삭제</h3>
            </section>
          </CardHeader>
          <CardBody>
            <SkeletonItem styles={{ width: '5em', height: '2em', marginBottom: '1.15em' }} />
            <p className="description">
              해당 멤버를 삭제하면 연관된 포토카드도 모두 지워지니 신중히 삭제해주세요.
            </p>
          </CardBody>
        </Card>
      </section>
    </>
  );
}

export default Loading;
