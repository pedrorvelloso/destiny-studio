import React from 'react';
import io from 'socket.io-client';

interface SubscribeOption {
  channel: string;
  onMessage(data: unknown): void;
}

interface SocketContextData {
  socket: SocketIOClient.Socket;
  subscribe(to: SubscribeOption[] | SubscribeOption): void;
  unsubscribe(from: string[] | string): void;
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

  const subscribe = React.useCallback(
    (to: SubscribeOption[] | SubscribeOption) => {
      if (Array.isArray(to)) {
        to.forEach((event) => {
          socket.on(event.channel, (data: unknown) => event.onMessage(data));
        });
      } else {
        socket.on(to.channel, (data: unknown) => to.onMessage(data));
      }
    },
    [socket],
  );

  const unsubscribe = React.useCallback(
    (from: string[] | string) => {
      if (Array.isArray(from)) {
        from.forEach((channel) => {
          socket.off(channel);
        });
      } else {
        socket.off(from);
      }
    },
    [socket],
  );

  return (
    <SocketContext.Provider value={{ socket, subscribe, unsubscribe }}>
      {children}
    </SocketContext.Provider>
  );
};

export function useSocket(): SocketContextData {
  const context = React.useContext(SocketContext);

  if (!context) throw new Error('useSocket must be used inside SocketProvider');

  return context;
}
