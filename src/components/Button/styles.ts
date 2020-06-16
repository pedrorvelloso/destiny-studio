import styled from 'styled-components';
import { shade, readableColor } from 'polished';

interface ContainerProps {
  color?: string;
}

export const Container = styled.button<ContainerProps>`
  background: ${({ color }) => color || '#a751b7'};
  color: ${({ color }) => readableColor(color || '#a751b7')};
  border-radius: 10px;
  border: 0;

  padding: 0 16px;

  margin-top: 16px;
  height: 56px;
  width: 100%;

  font-weight: 500;

  transition: background-color 0.2s;

  :disabled {
    background: #666;
    cursor: not-allowed;

    &:hover {
      background: #666;
    }
  }

  &:hover {
    background: ${({ color }) => shade(0.2, color || '#a751b7')};
  }
`;
