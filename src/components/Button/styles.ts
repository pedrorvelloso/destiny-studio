import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  background: #a751b7;
  color: #fffeee;
  border-radius: 10px;
  border: 0;

  padding: 0 16px;

  margin-top: 16px;
  height: 56px;
  width: 100%;

  font-weight: 500;

  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.2, '#a751b7')};
  }
`;
