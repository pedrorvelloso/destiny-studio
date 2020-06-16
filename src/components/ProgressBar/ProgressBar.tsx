import React, { useEffect, useState } from 'react';

import AnimatedValue from 'components/AnimatedValue';

import { Container, InnerBar, Label } from './styles';

interface ProgressBarProps {
  total: number;
  value: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value, total }) => {
  const [perc, setPerc] = useState(0);

  useEffect(() => {
    const setWidthTimeout = setTimeout(() => {
      const calcPerc = (value / total) * 100;
      setPerc(calcPerc > 100 ? 100 : calcPerc);
    }, 300);

    return () => {
      clearTimeout(setWidthTimeout);
    };
  }, [total, value]);

  return (
    <Container>
      <InnerBar value={perc} />
      <Label>
        R$ <AnimatedValue value={value} formatValue={(n) => n.toFixed(2)} />
        /R${total}
      </Label>
    </Container>
  );
};

export default ProgressBar;
