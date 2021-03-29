import sinon from 'sinon';
import { renderHook, act } from '@testing-library/react-hooks';
import useSorting, { SORT_KEY } from '../useSorting';

describe('useSorting tests', () => {
  const sortingCallback = sinon.spy();
  const defaultSorting = { columnName: 'colOne', direction: 'asc' };

  it('should return initial sorting correctly', () => {
    const { result } = renderHook(() =>
      useSorting(['colOne', 'colTwo'], sortingCallback, defaultSorting),
    );

    const [, sorting] = result.current;
    expect(sorting).toEqual([defaultSorting]);
  });

  it('should handle sorting correctly', () => {
    const { result } = renderHook(() =>
      useSorting(['colOne', 'colTwo'], sortingCallback, defaultSorting),
    );

    act(() => {
      const [onSort] = result.current;
      onSort(null, { columnName: 'colTwo', direction: 'asc' });
    });

    const [, sorting] = result.current;
    expect(sorting).toEqual([{ columnName: 'colTwo', direction: 'desc' }]);
  });

  it('should call sortingCallback correctly with filter params', () => {
    const { result } = renderHook(() =>
      useSorting(['colOne', 'colTwo'], sortingCallback, defaultSorting),
    );

    act(() => {
      const [onSort] = result.current;
      onSort(null, { columnName: 'colTwo', direction: 'asc' });
    });

    expect(sortingCallback.calledWith({ [SORT_KEY]: 'col_two desc' })).toBeTruthy();
  });
});
