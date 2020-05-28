import React from 'react';
import { IconBaseProps } from 'react-icons';

import { Loading, Container } from './styles';

interface LoadingIndicatorProps extends IconBaseProps {
  centered?: boolean;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  centered,
  ...props
}) => {
  if (centered)
    return (
      <Container>
        <Loading {...props} />
      </Container>
    );

  return <Loading {...props} />;
};

export default LoadingIndicator;
