import React from 'react';

import { Container, ContainerProps } from './styles';

interface SimpleBoxProps extends ContainerProps {
  title: string;
}

const SimpleBox: React.FC<SimpleBoxProps> = ({ title, children, color }) => {
  return (
    <Container color={color}>
      <span>{title}</span>
      <h1>{children}</h1>
    </Container>
  );
};

export default SimpleBox;
