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
  allocatedTo?: number;
}

const ToGoal: React.FC<ToGoalProps> = ({
  option,
  donationAmount,
  onAllocate,
  goal,
  allocatedTo,
}) => {
  const [totalDonation, setTotalDonation] = useState(option.total);
  const [wantToAllocate, setWantToAllocate] = useState(false);

  const handleWantToAllocate = useCallback((amount: number) => {
    setWantToAllocate(true);
    setTotalDonation((prevTotal) => prevTotal + amount);
  }, []);

  const RenderAllocateButtons: React.FC = () => {
    if (wantToAllocate)
      return (
        <Button color="yellow" onClick={() => onAllocate(option.id)}>
          Click to confirm
        </Button>
      );

    if (allocatedTo === option.id)
      return <Button disabled>Allocated to this incentive</Button>;

    return (
      <Button onClick={() => handleWantToAllocate(donationAmount)}>
        Allocate
      </Button>
    );
  };

  return (
    <Container>
      <ProgressBar value={totalDonation} total={goal} />

      <RenderAllocateButtons />
    </Container>
  );
};

export default ToGoal;
