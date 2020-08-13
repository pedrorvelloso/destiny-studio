import React, { useMemo, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

import { formatDistance } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

import { useAuth } from 'modules/AuthManager';

import LoadingIndicator from 'components/LoadingIndicator';

import {
  Container,
  DonationContainer,
  StatusBar,
  Donation,
  DonationValue,
  AnimatedDiv,
} from './styles';

interface DonationBoxProps {
  id: number;
  from: string;
  message: string;
  amount: number;
  reviewer?: string;
  createdAt: string;
  onReview(): void | Promise<void>;
  canReview: boolean;
  style: Record<string, unknown>;
}

const DonationBox: React.FC<DonationBoxProps> = ({
  id,
  from,
  message,
  amount,
  reviewer,
  createdAt,
  canReview,
  style,
  onReview,
}) => {
  const [isReviewing, setIsReviewing] = useState(false);
  const { user } = useAuth();

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
  const handleReview = useCallback(async () => {
    setIsReviewing(true);
    await onReview();
    setIsReviewing(false);
  }, [onReview]);

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
          {user && (
            <Link
              to={{
                pathname: `/allocate/${id}`,
                state: { amount },
              }}
            />
          )}
        </DonationContainer>
        <StatusBar reviewed={!!reviewer}>
          {!reviewer && (
            <>
              {canReview ? (
                <>
                  {isReviewing && <LoadingIndicator />}
                  {!isReviewing && (
                    <button type="button" onClick={handleReview}>
                      Click to Review
                    </button>
                  )}
                </>
              ) : (
                <p>Awaiting reviewer</p>
              )}
            </>
          )}
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
