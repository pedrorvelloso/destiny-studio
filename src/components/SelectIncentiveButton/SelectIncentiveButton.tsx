import React, { useState, useEffect } from 'react';

import AnimatedValue from 'components/AnimatedValue';

import { Container } from './styles';

interface SelectIncentiveButtonProps {
  checked: boolean;
  label?: string;
  onClick: () => void;
  total: number;
  donationAmount: number;
  allocated: boolean;
}

const SelectIncentiveButton: React.FC<SelectIncentiveButtonProps> = ({
  checked,
  label,
  onClick,
  total,
  donationAmount,
  allocated,
}) => {
  const [totalIncentive, setTotalIncentive] = useState(total);

  useEffect(() => {
    if (checked && !allocated) setTotalIncentive(total + donationAmount);
    else setTotalIncentive(total);
  }, [allocated, checked, donationAmount, total]);

  return (
    <Container
      checked={checked}
      allocated={allocated}
      onClick={() => {
        if (!allocated) onClick();
      }}
    >
      <p>{label}</p>
      <span>
        R${' '}
        <AnimatedValue
          value={totalIncentive}
          formatValue={(n) => n.toFixed(2)}
        />
      </span>
    </Container>
  );
};

export default SelectIncentiveButton;
