import React, { useEffect } from 'react';

import {
  FiAlertCircle,
  FiAlertTriangle,
  FiXCircle,
  FiCheckCircle,
  FiInfo,
} from 'react-icons/fi';

import { ToastMessage, useToast } from 'modules/ToastManager';

import { Container } from './styles';

interface ToastProps {
  message: ToastMessage;
  style: any;
}

const icons = {
  info: <FiInfo size={24} />,
  error: <FiAlertCircle size={24} />,
  success: <FiCheckCircle size={24} />,
  warn: <FiAlertTriangle size={24} />,
};

const Toast: React.FC<ToastProps> = ({ message, style }) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [message.id, removeToast]);

  return (
    <Container type={message.type} style={style}>
      {icons[message.type || 'info']}

      <div>
        <strong>{message.title}</strong>
      </div>

      <button type="button" onClick={() => removeToast(message.id)}>
        <FiXCircle size={18} />
      </button>
    </Container>
  );
};

export default Toast;
