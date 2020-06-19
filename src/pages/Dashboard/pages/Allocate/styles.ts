import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  position: relative;
  width: 100%;

  h1 {
    display: flex;
    align-items: center;
    justify-content: space-between;

    font-family: 'Roboto Mono', monospace;

    svg {
      cursor: pointer;
    }
  }

  .title {
    margin-bottom: 15px;
  }
`;

export const IncentiveContainer = styled.button`
  border: 2px solid #2e656a;

  border-radius: 10px;
  margin-top: 15px;

  width: 100%;

  background: #2e656a;
  color: #fff;

  transition: background 0.2s ease-in-out;

  p {
    font-size: 14px;
  }

  :hover {
    background: ${shade(0.2, '#2e656a')};
  }
`;

export const IncentiveHeader = styled.div`
  padding: 16px;
  border-radius: 5px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
`;
