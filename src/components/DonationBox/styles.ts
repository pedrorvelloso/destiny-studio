import styled from 'styled-components';
import { animated } from 'react-spring';

interface DonationStatus {
  reviewed: boolean;
}

export const AnimatedDiv = styled(animated.div)`
  & + div {
    margin-top: 8px;
  }
`;

export const Container = styled.div<DonationStatus>`
  transition: border 0.2s ease-in-out;

  border: 2px solid
    ${({ reviewed }): string => (reviewed ? '#2e656a' : '#c53030')};

  border-radius: 5px;

  user-select: none;
`;

export const DonationContainer = styled.div`
  padding: 15px;

  display: flex;

  position: relative;

  a {
    &::after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      z-index: 1;
    }
  }
`;

export const Donation = styled.div`
  width: 65%;

  h5 {
    margin-bottom: 8px;
  }
`;

export const DonationValue = styled.div`
  flex: 1;

  display: flex;
  align-items: center;
  justify-content: flex-end;

  font-family: 'Roboto Mono', monospace;
  font-size: 25px;
`;

export const StatusBar = styled.div<DonationStatus>`
  transition: background-color 0.2s ease-in-out;

  display: flex;
  align-items: center;
  justify-content: flex-end;

  background-color: ${({ reviewed }): string =>
    reviewed ? '#2e656a' : '#c53030'};
  padding: 6px 8px;

  font-size: 14px;

  svg {
    margin-right: 4px;
  }

  button {
    flex: 1;
    border: none;
    background: none;

    color: #fff;
    font-size: 14px;

    text-align: right;
  }
`;
