import SkeletonItem from '@component/skeleton/SkeletonItem';
import Card from '@component/card/basic/Card';
import { CardHeader, CardBody } from '@component/card/basic/_styles';

function Loading() {
  return (
    <>
      <section className="name-section">
        <SkeletonItem styles={{ height: "2em", marginBottom: "0.5em" }} />
        <SkeletonItem styles={{ height: "1.2em" }} />

        <Card styles={{ marginTop: "2.3em", marginBottom: "5em" }}>
          <CardHeader>
            <section className="title-section">
              <h3 className="title-label">등록된 포토카드</h3>
            </section>
          </CardHeader>
          <CardBody>
            <SkeletonItem styles={{ height: "1.4em" }} />
          </CardBody>
        </Card>

        <Card styles={{ marginTop: "2.3em", marginBottom: "5em" }}>
          <CardHeader>
            <section className="title-section">
              <h3 className="title-label">멤버 삭제</h3>
            </section>
          </CardHeader>
          <CardBody>
            <SkeletonItem styles={{ height: "2em", marginBottom: "1.15em" }} />
            <p className="description">해당 멤버를 삭제하면 연관된 포토카드도 모두 지워지니 신중히 삭제해주세요.</p>
          </CardBody>
        </Card>
      </section>
    </>
  );
}

export default Loading;