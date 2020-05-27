import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
  hasError: boolean;
}

export const Container = styled.div<ContainerProps>`
  color: #a751b7;
  background: #201821;
  border-radius: 10px;
  border: 2px solid #201821;
  padding: 16px;
  width: 100%;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  ${(props) =>
    props.hasError &&
    css`
      border-color: #c53030;
    `}

  ${(props) =>
    props.isFocused &&
    css`
      border-color: #a751b7;
    `}

  input {
    color: #f4ede8;
    background: transparent;
    flex: 1;
    border: 0;

    &::placeholder {
      color: #bca6bf;
    }
  }

  svg {
    margin-right: 16px;
  }
`;
