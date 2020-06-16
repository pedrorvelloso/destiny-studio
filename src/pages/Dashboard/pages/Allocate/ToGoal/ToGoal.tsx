import React, { useState, useCallback } from 'react';

import IncentiveOptions from 'models/IncentiveOptions';

import ProgressBar from 'components/ProgressBar';
import Button from 'components/Button';

import { Container } from './styles';

interface ToGoalProps {
  option: IncentiveOptions;
  donationAmount: number;
  onAllocate(id: number): void;
  goal: number;
}

const ToGoal: React.FC<ToGoalProps> = ({
  option,
  donationAmount,
  onAllocate,
  goal,
}) => {
  const [totalDonation, setTotalDonation] = useState(option.total);
  const [wantToAllocate, setWantToAllocate] = useState(false);

  const handleWantToAllocate = useCallback((amount: number) => {
    setWantToAllocate(true);
    setTotalDonation((prevTotal) => prevTotal + amount);
  }, []);

  return (
    <Container>
      <ProgressBar value={totalDonation} total={goal} />

      {wantToAllocate && (
        <Button color="yellow" onClick={() => onAllocate(option.id)}>
          Click to confirm
        </Button>
      )}
      {!wantToAllocate && (
        <Button onClick={() => handleWantToAllocate(donationAmount)}>
          Allocate
        </Button>
      )}
    </Container>
  );
};

export default ToGoal;
