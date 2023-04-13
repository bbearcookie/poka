import React, { useCallback } from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import Button from '@component/form/button/Button';
import Input from '@component/form/input/Input';
import { State, Action } from '@component/shipping/address/editor/reducer';
import { PostcodeSection } from '../_styles';

interface Props {
  state: State;
  dispatch: React.Dispatch<Action>;
}

function Postcode({ state, dispatch }: Props) {
  const daumPostcode = useDaumPostcodePopup();

  // 다음 주소 API 팝업 열기
  const openAddressPopup = useCallback(() => {
    daumPostcode({
      onComplete: data => {
        let address = data.roadAddress;
        if (data.buildingName) address += ` (${data.buildingName})`;

        dispatch({ type: 'SET_FORM_DATA', target: 'address', value: address });
        dispatch({ type: 'SET_FORM_DATA', target: 'postcode', value: data.zonecode });
        dispatch({ type: 'SET_MESSAGE', target: 'address', value: '' });
      },
    });
  }, [daumPostcode, dispatch]);

  return (
    <PostcodeSection>
      <Input
        type="text"
        name="postcode"
        value={state.form.postcode}
        placeholder="우편번호"
        readOnly={true}
        css={{
          display: 'inline-block',
          width: '6em',
          height: '2.5em',
        }}
      />
      <Button
        buttonTheme="primary"
        type="button"
        css={{
          width: '7em',
          justifyContent: 'center',
          theme: 'gray',
          padding: '0.7em 1em',
        }}
        onClick={openAddressPopup}
      >
        주소 찾기
      </Button>
    </PostcodeSection>
  );
}

export default Postcode;
