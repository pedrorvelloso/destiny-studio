import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

import loginBackground from 'assets/login-background.jpg';

export const Container = styled.div`
  height: 100vh;

  display: flex;
`;

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  animation: ${appearFromLeft} 1s;

  width: 100%;
  max-width: 500px;
  padding: 16px;

  form {
    width: 100%;
    max-width: 360px;

    text-align: center;
  }

  h1 {
    margin-bottom: 24px;
  }

  a {
    color: #f4ede8;
    display: block;

    margin-top: 24px;

    text-decoration: none;

    transition: color 0.2s;

    &:hover {
      color: ${shade(0.2, '#f4ede8')};
    }
  }

  > a {
    color: #a751b7;
    display: block;

    margin-top: 24px;

    text-decoration: none;

    transition: color 0.2s;

    display: flex;
    align-items: center;

    svg {
      margin-right: 16px;
    }

    &:hover {
      color: ${shade(0.2, '#a751b7')};
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${loginBackground}) no-repeat center;
  background-size: cover;
`;
