import React, { useCallback } from 'react';
import { useQuery } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { ErrorType } from '@util/commonAPI';
import * as queryKey from '@util/queryKey';
import * as groupAPI from '@api/groupAPI';
import * as memberAPI from '@api/memberAPI';
import Card from '@component/card/basic/Card';
import CardBody from '@component/card/basic/CardBody';
import Select from '@component/form/Select';
import InputMessage from '@component/form/InputMessage';
import { SelectType } from './Index';

interface SelectCardProps {
  select: SelectType;
  setSelect: React.Dispatch<React.SetStateAction<SelectType>>;
  selectMessage: {[k in keyof SelectType]: string;};
  setSelectMessage: React.Dispatch<React.SetStateAction<{[k in keyof SelectType]: string;}>>
  children?: React.ReactNode;
}
const SelectCardDefaultProps = {};

function SelectCard({ select, setSelect, selectMessage, setSelectMessage, children }: SelectCardProps & typeof SelectCardDefaultProps) {
  const groupQuery =
  useQuery<AxiosResponse<typeof groupAPI.getAllGroupList.resType>, AxiosError<ErrorType>>
  (queryKey.groupKeys.all, groupAPI.getAllGroupList.axios);

  const memberQuery = 
  useQuery<AxiosResponse<typeof memberAPI.getMembersOfGroup.resType>, AxiosError<ErrorType>>
  (queryKey.groupKeys.members(select.groupId), memberAPI.getMembersOfGroup.axios(select.groupId));

  // 그룹 선택 변경
  const onChangeGroup = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelect({
      groupId: Number(e.target.value),
      memberId: 0
    });
    setSelectMessage({ ...selectMessage, groupId: '' });
  }, [setSelect, selectMessage, setSelectMessage]);

  // 멤버 선택 변경
  const onChangeMember = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelect({
      groupId: select.groupId,
      memberId: Number(e.target.value)
    });
    setSelectMessage({ ...selectMessage, memberId: '' });
  }, [select, setSelect, selectMessage, setSelectMessage]);

  return (
    <Card className="SelectCard">
      <CardBody>
        <h3 className="label">그룹 멤버 정보</h3>

        <section className="input-section">
          <section className="input-line">
            <span className="input-label">그룹</span>
            <Select width="100%" height="2.5rem" marginLeft="1em" onChange={onChangeGroup}>
              <option value={0}>선택</option>
              {groupQuery.data?.data?.groups.map((item) => (
                <option key={item.group_id} value={item.group_id}>{item.name}</option>
              ))}
            </Select>
          </section>
          {selectMessage.groupId && <InputMessage margin="0.5em 0 0 0">{selectMessage.groupId}</InputMessage>}
        </section>

        <section className="input-section">
          <section className="input-line">
            <span className="input-label">멤버</span>
            <Select width="100%" height="2.5rem" marginLeft="1em" onChange={onChangeMember}>
              <option value={0}>선택</option>
              {memberQuery.data?.data?.members.map((item) => (
                <option key={item.member_id} value={item.member_id}>{item.name}</option>
              ))}
            </Select>
          </section>
          {selectMessage.memberId && <InputMessage margin="0.5em 0 0 0">{selectMessage.memberId}</InputMessage>}
        </section>

        <p className="description">등록하려는 포토카드들이 어떤 대상의 포토카드인지를 지정합니다.</p>
      </CardBody>
    </Card>
  );
}

SelectCard.defaultProps = SelectCardDefaultProps;
export default SelectCard;