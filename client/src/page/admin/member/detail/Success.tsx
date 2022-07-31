import React from 'react';
import { AxiosResponse } from 'axios';
import * as memberAPI from '@api/memberAPI';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Button from '@component/form/Button';
import Card from '@component/card/basic/Card';
import CardHeader from '@component/card/basic/CardHeader';
import CardBody from '@component/card/basic/CardBody';
import MemberRemove from './MemberRemove';

interface SuccessProps {
  member: AxiosResponse<typeof memberAPI.getMemberDetail.resType>;
  memberId: number;
}
const SuccessDefaultProps = {};

function Success({ member, memberId }: SuccessProps & typeof SuccessDefaultProps) {
  return (
    <>
      <section className="name-section">
        <p className="name-label">{member.data?.name}</p>
        <p>그룹: <span className="group-name-label">{member.data?.group_name}</span></p>
      </section>

      <Card marginBottom="5em">
        <CardHeader>
          <section className="title-section">
            <h3 className="title-label">등록된 포토카드</h3>
            <Button
              rightIcon={faArrowRight}
              styles={{
                theme: "primary"
              }}
            >목록</Button>
          </section>
        </CardHeader>
        <CardBody>
          <p className="text">{member.data?.photo_cnt} 종류</p>
        </CardBody>
      </Card>

      <MemberRemove member={member} memberId={memberId} />
    </>
  );
}

Success.defaultProps = SuccessDefaultProps;
export default Success;