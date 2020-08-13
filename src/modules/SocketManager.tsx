import React from 'react';
import io from 'socket.io-client';

interface EventOption {
  channel: string;
  onMessage(data: unknown): void;
}

interface SubscribeOptions {
  skip?: boolean;
}

interface SocketContextData {
  socket: SocketIOClient.Socket;
  subscribe(
    to: EventOption[] | EventOption,
    options?: SubscribeOptions,
  ): {
    unsubscribe(): void;
  };
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

  const subscribe = React.useCallback(
    (to: EventOption[] | EventOption, options?: SubscribeOptions) => {
      let channels: string | string[];

      if (!options?.skip) {
        if (Array.isArray(to)) {
          const manyChannels: string[] = [];

          to.forEach((event) => {
            socket.on(event.channel, (data: unknown) => event.onMessage(data));
            manyChannels.push(event.channel);
          });

          channels = manyChannels;
        } else {
          socket.on(to.channel, (data: unknown) => to.onMessage(data));

          channels = to.channel;
        }
      }

      return {
        unsubscribe: () => {
          if (options?.skip) return;
          unsubscribe(channels);
        },
      };
    },
    [socket, unsubscribe],
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
