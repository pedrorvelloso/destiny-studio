import React, { InputHTMLAttributes, useState, useCallback } from 'react';
import { IconType } from 'react-icons';

import { FiAlertCircle } from 'react-icons/fi';
import { Container, Error } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  innerRef?:
    | string
    | ((instance: HTMLInputElement | null) => void)
    | React.RefObject<HTMLInputElement>
    | null
    | undefined;
  icon?: IconType;
  inputError?: string | null;
}

const Input: React.FC<InputProps> = ({
  name,
  innerRef,
  icon: Icon,
  inputError,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleInputFocus = useCallback(() => setIsFocused(true), []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  return (
    <Container hasError={!!inputError} isFocused={isFocused}>
      {Icon && <Icon size={20} />}
      <input
        name={name}
        ref={innerRef}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        {...props}
      />
      {inputError && (
        <Error title={inputError}>
          <FiAlertCircle color="#c53030" />
        </Error>
      )}
    </Container>
  );
};

export default Input;
