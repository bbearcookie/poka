import React from 'react';
import classNames from 'classnames';
import './Input.scss';

interface InputProps {
  className?: string;
  type: React.HTMLInputTypeAttribute;
  name: string;
  value?: any;
  message?: string;
  autoComplete?: string;
  maxLength?: number;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const InputDefaultProps = {
  message: '',
  autoComplete: 'on',
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {},
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => {},
};

function Input({ className, type, name, value, message, placeholder, maxLength, autoComplete, onChange, onBlur }: InputProps & typeof InputDefaultProps) {
  return (
    <div className={classNames("Input", className)}>
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        maxLength={maxLength}
        autoComplete={autoComplete}
        onChange={onChange}
        onBlur={onBlur}
      />
      {message && <p className="Input__message-label">{message}</p>}
    </div>
  );
}

Input.defaultProps = InputDefaultProps;

export default Input;