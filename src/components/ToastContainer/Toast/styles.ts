import styled, { css } from 'styled-components';
import { animated } from 'react-spring';

interface ToastProps {
  type?: 'success' | 'error' | 'warn' | 'info';
}

const toastTypeVariations = {
  info: css`
    background: #2196f3;
    color: #fff;
  `,
  success: css`
    background: #4caf50;
    color: #fff;
  `,
  error: css`
    background: #f44336;
    color: #fff;
  `,
  warn: css`
    background: #ff9800;
    color: #fff;
  `,
};

export const Container = styled(animated.div)<ToastProps>`
  width: 360px;

  position: relative;
  padding: 12px 22px;
  border-radius: 10px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);

  display: flex;
  align-items: center;

  font-family: 'Roboto Mono', monospace;

  & + div {
    margin-top: 8px;
  }

  ${(props) => toastTypeVariations[props.type || 'info']}

  > svg {
    margin: 4px 12px 0 0;
  }

  div {
    flex: 1;

    p {
      margin-top: 4px;
      font-size: 14px;
      opacity: 0.8;
      line-height: 20px;
    }
  }

  button {
    position: absolute;
    right: 16px;
    top: 19px;
    opacity: 0.6;
    border: 0;
    background: transparent;
    color: inherit;
  }

  @media (max-width: 680px) {
    width: 100%;
  }
`;
