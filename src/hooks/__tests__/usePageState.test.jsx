import sinon from 'sinon';
import { renderHook, act } from '@testing-library/react-hooks';
import usePageState from '../usePageState';

describe('usePageState tests', () => {
  it('should set Page correctly', () => {
    const { result } = renderHook(() => usePageState(1, 1, () => {}));

    act(() => {
      const [_, setPage] = result.current;
      setPage(2);
    });

    const [page] = result.current;
    expect(page).toBe(2);
  });

  it('should update page when external currentPage is changed', () => {
    let currentPage = 1;

    const { result, rerender } = renderHook(() => usePageState(currentPage, 1, () => {}));

    currentPage = 5;

    rerender();

    const [page] = result.current;

    expect(page).toBe(5);
  });

  it('should call goToPage when on user commits valid page', () => {
    const goToPage = sinon.spy();

    const payload = { key: 'Enter', target: { value: '5' } };

    const { result } = renderHook(() => usePageState(1, 10, goToPage));
    const [_, __, onKeyDown] = result.current;

    onKeyDown(payload);

    expect(goToPage.calledWith(5)).toBeTruthy();
  });

  it('should not call goToPage when on user commits invalid page', () => {
    const goToPage = sinon.spy();

    const payload = { key: 'Enter', target: { value: '5' } };

    const { result } = renderHook(() => usePageState(1, 4, goToPage));
    const [_, __, onKeyDown] = result.current;

    onKeyDown(payload);

    const [page] = result.current;

    expect(goToPage.called).toBeFalsy();
    expect(page).toBe(1);
  });
});
