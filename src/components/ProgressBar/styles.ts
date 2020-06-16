import styled from 'styled-components';

export const Container = styled.div`
  border: 2px solid #2e656a;
  height: 45px;
  width: 100%;

  border-radius: 10px;

  position: relative;
`;

interface InnerBarProps {
  value?: number;
}

export const InnerBar = styled.div<InnerBarProps>`
  height: 100%;
  width: ${({ value }) => value || 0}%;
  background: #2e656a;
  border-radius: 8px;

  transition: all 1s cubic-bezier(0.19, 1, 0.22, 1);
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
