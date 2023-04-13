import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { State, Action } from '../../reducer';
import Postcode from './content/Postcode';
import Address from './content/Address';
import AddressDetail from './content/AddressDetail';
import { InputLine } from '../_styles';
import { AddressSection } from './_styles';

interface Props {
  state: State;
  dispatch: React.Dispatch<Action>;
  changeInput: React.ChangeEventHandler<HTMLInputElement>;
  blurInput: React.FocusEventHandler<HTMLInputElement>;
}

function Index(props: Props) {
  return (
    <InputLine>
      <div className="label-section">
        <FontAwesomeIcon
          className="icon"
          icon={faLocationDot}
          width="1.5em"
          height="1.5em"
          color="#2678F3"
        />
        <span className="label">주소</span>
      </div>

      <div className="input-section">
        <Postcode {...props} />
        <AddressSection>
          <Address {...props} />
          <AddressDetail {...props} />
        </AddressSection>
      </div>
    </InputLine>
  );
}

export default Index;
