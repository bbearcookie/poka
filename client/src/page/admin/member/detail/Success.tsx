import { Link } from 'react-router-dom';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { ResType as MemberType } from '@api/query/member/useMemberQuery';
import Button from '@component/form/button/Button';
import TitleLabel from '@component/label/TitleLabel';
import { Card, CardHeader, CardBody } from '@component/card/basic/_styles';
import MemberRemove from './content/MemberRemove';

interface Props {
  member: MemberType;
  memberId: number;
}

function Success({ member, memberId }: Props) {
  return (
    <>
      <section className="name-section">
        <p className="name-label">{member?.name}</p>
        <p>
          그룹: <span className="group-name-label">{member?.groupName}</span>
        </p>
      </section>

      <Card css={{ marginBottom: '5em' }}>
        <CardHeader>
          <TitleLabel title="등록된 포토카드">
            <Link to={`/admin/photo/list?groupId=${member.groupId}&memberId=${member.memberId}`}>
              <Button buttonTheme="primary" rightIcon={faArrowRight} iconMargin="1em">
                목록
              </Button>
            </Link>
          </TitleLabel>
        </CardHeader>
        <CardBody>
          <p className="text">{member?.photoCount} 종류</p>
        </CardBody>
      </Card>

      <MemberRemove member={member} memberId={memberId} />
    </>
  );
}

export default Success;
