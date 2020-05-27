import React from 'react';
import { AiOutlineLoading } from 'react-icons/ai';

import { Container } from './styles';

const FullScreenLoading: React.FC = () => {
  return (
    <Container>
      <AiOutlineLoading size={52} />
    </Container>
  );
};

export default FullScreenLoading;
