import React from 'react';
import { useTransition } from 'react-spring';

import { ToastMessage } from 'modules/ToastManager';

import { Container } from './styles';

import Toast from './Toast';

interface ToastContainerProps {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  const messagesWithTrasitions = useTransition(
    messages,
    (message) => message.id,
    {
      from: { opacity: 0 },
      enter: { opacity: 0.8 },
      leave: { opacity: 0 },
    },
  );

  return (
    <Container>
      {messagesWithTrasitions.map(({ item, key, props }) => (
        <Toast key={key} style={props} message={item} />
      ))}
    </Container>
  );
};

export default ToastContainer;
