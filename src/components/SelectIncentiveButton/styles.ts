import styled from 'styled-components';

interface ContainerProps {
  checked: boolean;
}

export const Container = styled.div<ContainerProps>`
  border: 2px solid ${({ checked }) => (checked ? '#2e656a' : '#a751b7')};
  padding: 16px;

  background: ${({ checked }) => (checked ? '#2e656a' : 'transparent')};

  cursor: pointer;
  user-select: none;

  border-radius: 10px;

  margin-top: 10px;

  display: flex;
  justify-content: space-between;

  transition: all 0.2s ease-in-out;

  span {
    font-family: 'Roboto Mono', monospace;
  }
`;
