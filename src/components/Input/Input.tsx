import React, { InputHTMLAttributes, useState, useCallback } from 'react';
import { IconType } from 'react-icons';

import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  innerRef?:
    | string
    | ((instance: HTMLInputElement | null) => void)
    | React.RefObject<HTMLInputElement>
    | null
    | undefined;
  icon?: IconType;
}

const Input: React.FC<InputProps> = ({
  name,
  innerRef,
  icon: Icon,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleInputFocus = useCallback(() => setIsFocused(true), []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  return (
    <Container hasError={false} isFocused={isFocused}>
      {Icon && <Icon size={20} />}
      <input
        name={name}
        ref={innerRef}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        {...props}
      />
    </Container>
  );
};

export default Input;
