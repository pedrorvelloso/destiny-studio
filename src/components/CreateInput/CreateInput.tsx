import React, { useState, useCallback } from 'react';
import { FaPlus } from 'react-icons/fa';

import { Container, ButtonStyled, InputStyled } from './styles';

interface CreateInputProps {
  onSubmit(value: string): void;
}

const CreateInput: React.FC<CreateInputProps> = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const handleSubmit = useCallback(
    async (inputValue: string) => {
      await onSubmit(inputValue);

      setValue('');
    },
    [onSubmit],
  );

  return (
    <Container>
      <InputStyled
        name="create"
        placeholder="New option..."
        value={value}
        autoComplete="off"
        onChange={(e) => setValue(e.target.value)}
      />
      <ButtonStyled onClick={() => handleSubmit(value)} disabled={!value}>
        <FaPlus size={18} />
      </ButtonStyled>
    </Container>
  );
};

export default CreateInput;
