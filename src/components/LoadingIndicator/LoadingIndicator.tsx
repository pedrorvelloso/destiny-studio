import React from 'react';
import { IconBaseProps } from 'react-icons';

import { Loading } from './styles';

const LoadingIndicator: React.FC<IconBaseProps> = ({ ...props }) => {
  return <Loading {...props} />;
};

export default LoadingIndicator;
