import styled from 'styled-components';

import Button from 'components/Button';
import Input from 'components/Input';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-top: 15px;
`;

export const ButtonStyled = styled(Button)`
  margin: 0;
  width: 10%;
`;

export const InputStyled = styled(Input).attrs({ variant: 'underline' })`
  width: 88%;
`;
