import React, { useState, useEffect } from 'react';

import AnimatedValue from 'components/AnimatedValue';

import { Container } from './styles';

interface SelectIncentiveButtonProps {
  checked: boolean;
  label?: string;
  onClick: () => void;
  total: number;
  donationAmount: number;
}

const SelectIncentiveButton: React.FC<SelectIncentiveButtonProps> = ({
  checked,
  label,
  onClick,
  total,
  donationAmount,
}) => {
  const [totalIncentive, setTotalIncentive] = useState(total);

  useEffect(() => {
    if (checked) setTotalIncentive(total + donationAmount);
    else setTotalIncentive(total);
  }, [checked, donationAmount, total]);

  return (
    <Container checked={checked} onClick={onClick}>
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
