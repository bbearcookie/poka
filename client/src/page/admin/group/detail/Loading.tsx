import SkeletonItem from '@component/skeleton/SkeletonItem';
import Card from '@component/card/basic/Card';
import { CardHeader } from '@component/card/basic/_styles';
import Table from '@component/table/Table';
import Col from '@component/table/styles/Col';

function Loading() {
  return (
    <>
      <div className="GroupProfile">
        <SkeletonItem
          styles={{
            width: '60px',
            height: '60px',
          }}
        />
        <SkeletonItem styles={{ width: '5em', margin: '1.62em 0' }} />
      </div>
      <Card className="MemberList" styles={{ marginBottom: '5em' }}>
        <CardHeader>
          <div className="title">그룹의 멤버</div>
        </CardHeader>
        <Table styles={{ itemPadding: '1.5em' }}>
          <colgroup>
            <Col width="40%" />
            <Col width="30%" />
            <Col width="30%" />
          </colgroup>
          <thead>
            <tr>
              <th>이름</th>
              <th>등록된 포토카드</th>
              <th>액션</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 10 }).map((_, i) => (
              <tr key={i}>
                <td>
                  <SkeletonItem styles={{ width: '10em' }} />
                </td>
                <td>
                  <SkeletonItem styles={{ width: '5em' }} />
                </td>
                <td>
                  <section className="action-section">
                    <SkeletonItem styles={{ width: '2em', marginRight: '1em' }} />
                    <SkeletonItem styles={{ width: '2em' }} />
                  </section>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </>
  );
}

export default Loading;
