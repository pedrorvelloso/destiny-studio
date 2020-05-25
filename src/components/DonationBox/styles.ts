import styled from 'styled-components';

interface DonationStatus {
  reviewed: boolean;
}

export const Container = styled.div<DonationStatus>`
  border: 2px solid
    ${({ reviewed }): string => (reviewed ? '#2e656a' : '#c53030')};

  border-radius: 5px;

  user-select: none;

  & + div {
    margin-top: 8px;
  }
`;

export const DonationContainer = styled.div`
  padding: 15px;

  display: flex;
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
