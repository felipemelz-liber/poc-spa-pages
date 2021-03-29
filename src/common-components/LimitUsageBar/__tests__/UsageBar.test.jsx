import React from 'react';
import sinon from 'sinon';
import { render, fireEvent } from '@testing-library/react';
import LimitUsageBar from '..';

describe('LimitUsageBar tests', () => {
  const vendor = {
    anticipationLimit: {
      takenValue: 'R$ 123,50',
      totalValue: 'R$ 593,75',
      usagePercent: 0.208,
    },
  };
  const onRemoveLimit = sinon.spy();

  it('should render correct info and button', async () => {
    const { findByText } = render(<LimitUsageBar item={vendor} onRemoveLimit={onRemoveLimit} />);

    const valuesText = await findByText('R$ 123,50 de R$ 593,75');
    const removeButton = await findByText('Remover Limite');

    expect(valuesText).not.toBeNull();
    expect(removeButton).not.toBeNull();
  });

  it('should call onRemoveLimit when clicking on remove button', async () => {
    const { findByText } = render(<LimitUsageBar item={vendor} onRemoveLimit={onRemoveLimit} />);

    const removeButton = await findByText('Remover Limite');
    fireEvent.click(removeButton);

    expect(onRemoveLimit.calledOnce).toBeTruthy();
  });
});
