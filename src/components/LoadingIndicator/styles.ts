import styled, { keyframes } from 'styled-components';
import { AiOutlineLoading } from 'react-icons/ai';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const Loading = styled(AiOutlineLoading)`
  animation: ${rotate} 1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
`;

export const Container = styled.div`
  width: 100%;
  margin: 16px 0;

  display: flex;
  justify-content: center;
`;
