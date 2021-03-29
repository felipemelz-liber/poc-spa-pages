import sinon from 'sinon';
import { fireEvent, act } from '@testing-library/react';

import BuyerAnticipationLimits from '..';
import { renderWithModal } from '../../../../../vendor/test-utils';
import * as api from '../../../api';

describe('BuyerAnticipationLimits tests', () => {
  const paginationParameter = { page: 1, per: 10 };
  const fetchLimitsStub = sinon.stub(api, 'fetchLimits').resolves({});

  afterEach(() => {
    sinon.resetHistory();
  });

  afterAll(() => {
    sinon.restore();
  });

  it('should call fetchLimits with correct params based on tab click', async () => {
    const { findByTestId } = renderWithModal(BuyerAnticipationLimits);

    const calledForGlobal = fetchLimitsStub.calledWith(undefined, 'global', paginationParameter);
    const calledForFundersBefore = fetchLimitsStub.calledWith(
      undefined,
      'funders',
      paginationParameter,
    );
    const calledForBuyersBefore = fetchLimitsStub.calledWith(
      undefined,
      'buyers',
      paginationParameter,
    );

    const fundersTabButton = await findByTestId('funders-tab');
    const buyersTabButton = await findByTestId('buyers-tab');

    act(() => {
      fireEvent.click(fundersTabButton);
    });
    const calledForFunders = fetchLimitsStub.calledWith(undefined, 'funders', paginationParameter);

    act(() => {
      fireEvent.click(buyersTabButton);
    });
    const calledForBuyers = fetchLimitsStub.calledWith(undefined, 'buyers', paginationParameter);

    expect(calledForGlobal).toBeTruthy();
    expect(calledForFundersBefore).toBeFalsy();
    expect(calledForBuyersBefore).toBeFalsy();
    expect(calledForFunders).toBeTruthy();
    expect(calledForBuyers).toBeTruthy();
  });
});
