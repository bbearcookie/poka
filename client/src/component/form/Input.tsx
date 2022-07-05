import React from 'react';
import classNames from 'classnames';
import './Input.scss';

interface InputProps {
  type: React.HTMLInputTypeAttribute;
  name: string;
  value?: any;
  placeholder?: string;
  className?: string;
}

const InputDefaultProps = {};

function Input({ className, type, name, value, placeholder }: InputProps & typeof InputDefaultProps) {
  return (
    <input
      className={classNames("Input", className)}
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
    />
  );
}

Input.defaultProps = InputDefaultProps;

export default Input;