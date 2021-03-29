import { Thunk } from 'redux-testkit';
import sinon from 'sinon';
import { postAction } from '..';

describe('Testing client functions', () => {
  describe('postAction()', () => {
    let server;
    let data;

    afterEach(() => {
      server.restore();
    });

    beforeEach(() => {
      data = {
        fingerprint: 'ABC123',
        components: {
          userAgent: 'Mozilla',
        },
      };
      server = sinon.fakeServer.create();
    });

    it('should dispatch when successfully posted', async () => {
      setTimeout(
        () =>
          server.respond([200, { 'Content-Type': 'application/json' }, JSON.stringify('Success')]),
        0,
      );
      const dispatches = await Thunk(postAction).execute(data, 'breadcrumb', 'resource', {
        param: 'value',
      });
      expect(dispatches.length).toEqual(1);
      expect(dispatches[0].getAction()).toEqual({
        type: 'CLIENT_LOG/SUCCESSFULL_SUBMIT',
        payload: 'Success',
      });
    });

    it('should dispatch when failed post', async () => {
      setTimeout(
        () =>
          server.respond([500, { 'Content-Type': 'application/json' }, JSON.stringify('Failure')]),
        0,
      );
      const dispatches = await Thunk(postAction).execute(data, 'breadcrumb', 'resource', {
        param: 'value',
      });
      expect(dispatches.length).toEqual(1);
      expect(dispatches[0].getAction()).toEqual({
        type: 'CLIENT_LOG/FAILED_SUBMIT',
        payload: 'Failure',
      });
    });
  });
});
