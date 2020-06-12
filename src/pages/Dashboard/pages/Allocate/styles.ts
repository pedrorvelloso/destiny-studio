import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 100%;

  h1 {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

export const IncentiveContainer = styled.div`
  border: 2px solid #2e656a;

  border-radius: 10px;
  margin-top: 15px;

  p {
    font-size: 14px;
  }
`;

export const IncentiveHeader = styled.div`
  background: #2e656a;

  padding: 16px;
  border-radius: 5px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;
