import styled from 'styled-components';

export const Container = styled.div`
  max-width: 700px;

  margin: 15px auto;
  padding: 0 15px;
`;

export const DonationsList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Boxes = styled.div`
  display: flex;
  justify-content: space-between;

  > div {
    width: 48%;
  }

  @media (max-width: 650px) {
    flex-direction: column;
    > div {
      width: 100%;
    }
  }
`;

export const EventInfo = styled.div`
  margin-bottom: 22px;

  h1 {
    span {
      margin-left: 8px;
      font-size: 12px;
    }
  }
`;
