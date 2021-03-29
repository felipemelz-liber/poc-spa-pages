import React from 'react';
import sinon from 'sinon';
import { render, fireEvent } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';
import useEventListener from '../useEventListener';

describe('useEventListener tests', () => {
  const eventHandler = sinon.spy();

  it('should call eventHandler when given event is fired', () => {
    const { getByText } = render(<div>Mock</div>);
    const mockElement = getByText('Mock');

    renderHook(() => useEventListener('click', eventHandler, mockElement));

    act(() => {
      fireEvent.click(mockElement);
    });
    expect(eventHandler.calledOnce).toBeTruthy();

    act(() => {
      fireEvent.click(mockElement);
    });
    expect(eventHandler.calledTwice).toBeTruthy();
  });
});
