import React from 'react';

import AnimatedValue from 'components/AnimatedValue';

import { Container, InnerBar, Label } from './styles';

const ProgressBar: React.FC = () => {
  return (
    <Container>
      <InnerBar />
      <Label>
        R$ <AnimatedValue value={10} formatValue={(n) => n.toFixed(2)} />
        /R$1000
      </Label>
    </Container>
  );
};

export default ProgressBar;
