import React from 'react';
import io from 'socket.io-client';

interface SocketContextData {
  socket: SocketIOClient.Socket;
}

const SocketContext = React.createContext<SocketContextData>(
  {} as SocketContextData,
);

interface SocketProviderProps {
  host: string;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({
  children,
  host,
}) => {
  const socket = React.useMemo(
    () => io(host, { transports: ['websocket'], autoConnect: false }),
    [host],
  );

  React.useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export function useSocket(): SocketContextData {
  const context = React.useContext(SocketContext);

  if (!context) throw new Error('useSocket must be used inside SocketProvider');

  return context;
}
