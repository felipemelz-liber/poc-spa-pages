import sinon from 'sinon';
import axios from 'axios';
import { waitFor } from '@testing-library/react';

import LimitsTable from '..';
import {
  BUYERS_LIMITS_MOCK_RESPONSE,
  FUNDERS_LIMITS_MOCK_RESPONSE,
  GLOBAL_LIMITS_MOCK_RESPONSE,
} from '../../../constants';
import { renderWithModal } from '../../../../../vendor/test-utils';

describe('LimitsTable tests', () => {
  const getStub = sinon.stub(axios, 'get');

  afterEach(() => {
    sinon.resetHistory();
  });

  afterAll(() => {
    sinon.restore();
  });

  it('should show global limit correctly when selectedTable is global', async () => {
    getStub.resolves({ data: GLOBAL_LIMITS_MOCK_RESPONSE });

    const { findByText } = renderWithModal(LimitsTable, { selectedTable: 'global' });
    const limit = await waitFor(() => findByText('Global'));

    await waitFor(() => findByText('R$ 2.056.153,04 de R$ 3.812.000,89'));
    expect(limit).not.toBeNull();
  });

  it('should show funders limits correctly when selectedTable is funders', async () => {
    getStub.resolves({ data: FUNDERS_LIMITS_MOCK_RESPONSE });

    const { findByText } = renderWithModal(LimitsTable, {
      selectedTable: 'funders',
    });

    const firstFunder = await waitFor(() => findByText(/Bradesco/));
    const secondFunder = await waitFor(() => findByText(/BTG Pactual/));

    await waitFor(() => findByText('R$ 2.056.153,04 de R$ 3.812.000,89'));
    await waitFor(() => findByText('R$ 2.056.153,04 de R$ 9.056.153,04'));
    expect(firstFunder).not.toBeNull();
    expect(secondFunder).not.toBeNull();
  });

  it('should show buyers limits correctly when selectedTable is buyers', async () => {
    getStub.resolves({ data: BUYERS_LIMITS_MOCK_RESPONSE });

    const { findByText } = renderWithModal(LimitsTable, {
      selectedTable: 'buyers',
    });

    const firstBuyer = await waitFor(() => findByText(/BRF Aves/));
    const secondBuyer = await waitFor(() => findByText(/BRF Energia/));
    const thirdBuyer = await waitFor(() => findByText(/BRF Pet/));

    await waitFor(() => findByText('R$ 2.056.153,04 de R$ 3.812.000,89'));
    await waitFor(() => findByText('Nenhum limite definido'));
    await waitFor(() => findByText('R$ 2.056.153,04 de R$ 9.056.153,04'));
    expect(firstBuyer).not.toBeNull();
    expect(secondBuyer).not.toBeNull();
    expect(thirdBuyer).not.toBeNull();
  });
});
