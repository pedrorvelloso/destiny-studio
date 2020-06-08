import styled from 'styled-components';
import { animated } from 'react-spring';

export const Containers = styled.div`
  position: relative;
`;

export const OptionsContainer = styled(animated.div)`
  margin-top: 10px !important;
  position: absolute;
  top: 100%;

  width: 100%;
  color: #a751b7;
  background: #201821;
  border-radius: 10px;
  border: 2px solid #201821;
  padding: 16px;

  font-family: 'Roboto Mono', monospace;

  p {
    font-size: 14px;
  }
`;

export const Option = styled.div`
  margin: 0 -16px;
  padding: 16px;

  user-select: none;
  cursor: pointer;

  :hover {
    background: yellow;
  }
`;
