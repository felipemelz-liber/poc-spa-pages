import ActionCable from 'actioncable';

export const WEB_SOCKET_URL = `${WS_DOMAIN}/cable`; // eslint-disable-line
const DEFAULT_CONNECTION_TIMEOUT = 5000;

export function createSubscription(channel, roomId, options = {}) {
  const {
    received = () => {},
    connected = () => {},
    connectionFailed = () => {},
    connectionTimeout = DEFAULT_CONNECTION_TIMEOUT,
  } = options;

  const cable = ActionCable.createConsumer(WEB_SOCKET_URL);

  const timeout = setTimeout(() => {
    connectionFailed();
  }, connectionTimeout);

  return cable.subscriptions.create(
    {
      channel,
      room_id: roomId,
    },
    {
      received,
      connected: () => {
        clearTimeout(timeout);
        connected();
      },
    },
  );
}
