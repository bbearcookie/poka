import React, { useState, useEffect, useCallback } from 'react';
import SelectComponent from '@component/form/select/Select';
import { State, Action } from '../../reducer';

const OptionText = [
  '배송시 요청사항을 선택해주세요.',
  '직접 수령하겠습니다.',
  '배송 전 연락 바랍니다.',
  '부재 시 경비실에 맡겨주세요.',
  '부재 시 문 앞에 놓아주세요.',
  '부재 시 택배함에 놓아주세요.',
  '직접 입력',
];

interface Props {
  state: State;
  dispatch: React.Dispatch<Action>;
  setShowInput: React.Dispatch<React.SetStateAction<boolean>>;
}

function Select({ state, dispatch, setShowInput }: Props) {
  const [option, setOption] = useState(state.form.requirement ? OptionText.length - 1 : 0);

  // 배송 요청 사항 가져오기나 수정 모드 등으로 변할때마다 option 설정.
  useEffect(() => {
    // 배송 요청 사항이 비어있으면 0번째 option 선택.
    if (state.form.requirement === '') {
      if (option !== OptionText.length - 1) setOption(0);
      // 배송 요청 사항이 기본 내용중에 있으면 해당 option 선택.
    } else if (OptionText.includes(state.form.requirement)) {
      setOption(OptionText.findIndex(item => item === state.form.requirement));
      setShowInput(false);
      // 배송 요청 사항이 기본 내용과 다르면 마지막 option 선택.
    } else {
      setOption(OptionText.length - 1);
      setShowInput(true);
    }
  }, [state.form.requirement]);

  // 선택 변경
  const changeSelect = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = Number(e.target.value);
      setOption(value);

      // 맨 처음 선택지 (공백)
      if (value === 0) {
        setShowInput(false);
        dispatch({ type: 'SET_FORM_DATA', target: 'requirement', value: '' });
        // 가장 마지막 선택지 (직접 입력)
      } else if (value === OptionText.length - 1) {
        setShowInput(true);
        dispatch({ type: 'SET_FORM_DATA', target: 'requirement', value: '' });
        // 그 외 선택지
      } else {
        setShowInput(false);
        dispatch({ type: 'SET_FORM_DATA', target: 'requirement', value: OptionText[value] });
      }
    },
    [dispatch, setShowInput]
  );

  return (
    <SelectComponent
      name="requirement"
      onChange={changeSelect}
      value={option}
      css={{
        width: '100%',
        height: '2.5em',
      }}
    >
      {OptionText.map((text, idx) => (
        <option key={idx} value={idx}>
          {text}
        </option>
      ))}
    </SelectComponent>
  );
}

export default Select;
