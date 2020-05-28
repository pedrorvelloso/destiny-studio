import styled, { css } from 'styled-components';
import Tooltip from 'components/Tooltip';

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

    font-family: 'Roboto Mono', monospace;

    &::placeholder {
      color: #bca6bf;
    }
  }

  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
