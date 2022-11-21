import React, { useState, useEffect, useCallback } from 'react';
import { useAppSelector, useAppDispatch } from '@app/redux/reduxHooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import Input from '@component/form/Input';
import InputMessage from '@component/form/InputMessage';
import Select from '@component/form/Select';
import { setInput, FormType } from '../addressEditorSlice';

interface RequirementSectionProps {
  defaultShow?: boolean; // 직접 입력 input 창을 기본적으로 보여줄지 안보여줄지 설정. 수정 모드에서는 기본적으로 보여줘야 함.
  changeInput: React.ChangeEventHandler<HTMLInputElement>;
  blurInput: React.FocusEventHandler<HTMLInputElement>;
  children?: React.ReactNode;
}
const RequirementSectionDefaultProps = {
  defaultShow: false
};

function RequirementSection({ defaultShow, changeInput, blurInput, children }: RequirementSectionProps & typeof RequirementSectionDefaultProps) {
  const { form, inputMessage } = useAppSelector(state => state.addressEditor);
  const [showRequirement, setShowRequirement] = useState(defaultShow);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (form.requirement) {
      setShowRequirement(true);
    }
  }, []);

  // 배송 요청사항 선택 변경
  const changeRequirement = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setInput({
      name: e.target.name as keyof FormType,
      value: e.target.value
    }));

    // 직접 입력하는 input 요소 보여주기
    if (e.target.value === '') setShowRequirement(true);
    else setShowRequirement(false);
  }, [dispatch]);

  return (
    <section className="input-line">
      <section className="label-section">
        <FontAwesomeIcon className="icon" icon={faInfoCircle} width="1.5em" height="1.5em" color="#F3E079" />
        <span className="label">배송 요청사항</span>
      </section>
      <section className="input-section">
        <Select
          name="requirement"
          onChange={changeRequirement}
          styles={{
            width: "100%",
            height: "2.5em"
          }}
        >
          <option value="DEFAULT_VALUE">배송시 요청사항을 선택해주세요.</option>
          <option>직접 수령하겠습니다.</option>
          <option>배송 전 연락 바랍니다.</option>
          <option>부재 시 경비실에 맡겨주세요.</option>
          <option>부재 시 문 앞에 놓아주세요.</option>
          <option>부재 시 택배함에 놓아주세요.</option>
          <option value="" selected={defaultShow}>직접 입력</option>
        </Select>

        {showRequirement && 
        <Input
          type="text"
          name="requirement"
          placeholder="직접 입력"
          maxLength={50}
          value={form.requirement}
          onChange={changeInput}
          onBlur={blurInput}
          styles={{
            width: "100%",
            height: "2.5em",
            marginTop: "0.5em"
          }}
        >
          {inputMessage.requirement && <InputMessage styles={{ margin: "0.5em 0 0 0" }}>{inputMessage.requirement}</InputMessage>}
        </Input>}
      </section>
    </section>
  );
}

RequirementSection.defaultProps = RequirementSectionDefaultProps;
export default RequirementSection;