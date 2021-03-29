import ActionCable from 'actioncable';
import sinon from 'sinon';

import { createSubscription, WEB_SOCKET_URL } from '../action-cable';

describe('actionCable helper tests', () => {
  const channel = 'MockChannel';
  const room = 'MockRoomId';

  const create = sinon.spy();
  const consumerStub = sinon.stub(ActionCable, 'createConsumer');

  consumerStub.returns({
    subscriptions: {
      create,
    },
  });

  afterEach(() => sinon.resetHistory());

  it('should try to connect on correct channel and room', () => {
    createSubscription(channel, room);

    expect(consumerStub.calledWith(WEB_SOCKET_URL)).toBeTruthy();
    expect(
      create.calledWith({
        channel,
        room_id: room,
      }),
    ).toBeTruthy();
  });
});
