import styled from 'styled-components';

export const Container = styled.div`
  border: 2px solid #2e656a;
  height: 45px;
  width: 100%;

  border-radius: 10px;

  position: relative;
`;

export const InnerBar = styled.div`
  height: 100%;
  width: 30%;
  background: #2e656a;
  border-radius: 8px;

  transition: all 0.2s ease-in-out;
`;

export const Label = styled.span`
  position: absolute;

  display: flex;
  justify-content: center;
  align-items: center;

  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  font-family: 'Roboto Mono', monospace;
  font-size: 14px;
`;
