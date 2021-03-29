import sinon from 'sinon';
import { waitFor, fireEvent, act } from '@testing-library/react';

import { renderWithModal } from '../../../../../vendor/test-utils';
import * as api from '../../../api';
import EditLimitModal from '..';

describe('EditLimitModal tests', () => {
  sinon.stub(api, 'createOrUpdateLimit').resolves({});
  const props = { onUpdate: sinon.spy(), onLeaved: sinon.spy(), show: true };

  afterEach(() => {
    sinon.resetHistory();
  });

  afterAll(() => {
    sinon.restore();
  });

  it('should show modal', async () => {
    const { findByText } = renderWithModal(EditLimitModal, props);

    await waitFor(() => findByText('Atualizar Limites'));
    await waitFor(() => findByText('FECHAR'));
    await waitFor(() => findByText('ATUALIZAR'));
  });

  it('should call onLeave when clicking on close button', async () => {
    const { findByText } = renderWithModal(EditLimitModal, props);

    const closeButton = await findByText('FECHAR');

    fireEvent.click(closeButton);

    expect(props.onLeaved.called).toBeTruthy();
  });

  it('should have update button disabled if no value is typed', async () => {
    const { findByText } = renderWithModal(EditLimitModal, props);

    const updateButton = await findByText('ATUALIZAR');

    expect(updateButton.hasAttribute('disabled')).toBeTruthy();
  });

  it('should have update button enabled if value is typed', async () => {
    const { findByText, findByTestId } = renderWithModal(EditLimitModal, props);
    const updateButton = await findByText('ATUALIZAR');
    const input = await findByTestId('update-limit-input');

    act(() => {
      fireEvent.change(input, { target: { value: '1234,56' } });
    });

    expect(updateButton.hasAttribute('disabled')).toBeFalsy();
  });
});
