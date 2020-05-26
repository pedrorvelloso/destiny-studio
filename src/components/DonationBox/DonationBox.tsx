import React, { useMemo } from 'react';
import { FaCheckCircle } from 'react-icons/fa';

import { formatDistance } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

import {
  Container,
  DonationContainer,
  StatusBar,
  Donation,
  DonationValue,
  AnimatedDiv,
} from './styles';

interface DonationBoxProps {
  from: string;
  message: string;
  amount: number;
  reviewer?: string;
  createdAt: string;
  style: Record<string, unknown>;
}

const DonationBox: React.FC<DonationBoxProps> = ({
  from,
  message,
  amount,
  reviewer,
  createdAt,
  style,
}) => {
  const tz = useMemo(
    () => Intl.DateTimeFormat().resolvedOptions().timeZone,
    [],
  );
  const formattedDate = useMemo(
    () =>
      formatDistance(utcToZonedTime(new Date(createdAt), tz), new Date(), {
        addSuffix: true,
      }),
    [createdAt, tz],
  );

  return (
    <AnimatedDiv style={style}>
      <Container reviewed={!!reviewer}>
        <DonationContainer>
          <Donation>
            <h5>
              {from} - {formattedDate}
            </h5>
            <p>{message}</p>
          </Donation>
          <DonationValue>R$ {amount}</DonationValue>
        </DonationContainer>
        <StatusBar reviewed={!!reviewer}>
          {!reviewer && <button type="button">Click to Review</button>}
          {reviewer && (
            <>
              <FaCheckCircle /> Reviewed by {reviewer}
            </>
          )}
        </StatusBar>
      </Container>
    </AnimatedDiv>
  );
};

export default DonationBox;
