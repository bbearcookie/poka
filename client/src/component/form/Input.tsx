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

function Input({ className, type, name, value, message, placeholder, autoComplete, onChange, onBlur }: InputProps & typeof InputDefaultProps) {
  return (
    <article className={classNames("Input", className)}>
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={onChange}
        onBlur={onBlur}
      />
      <p className="Input__message-label">{message}</p>
    </article>
  );
}

Input.defaultProps = InputDefaultProps;

export default Input;