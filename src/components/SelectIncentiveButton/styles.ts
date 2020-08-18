import styled, { css } from 'styled-components';

interface ContainerProps {
  checked: boolean;
  allocated: boolean;
}

export const Container = styled.div<ContainerProps>`
  border: 2px solid ${({ checked }) => (checked ? '#2e656a' : '#a751b7')};
  padding: 16px;

  ${({ checked, allocated }) => {
    if (allocated)
      return css`
        background: #a751b7;
      `;
    if (checked)
      return css`
        background: #2e656a;
      `;
    return css`
      background: transparent;
    `;
  }};

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
