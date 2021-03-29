import { snakeCase } from 'lodash';
import { useCallback, useState, useEffect } from 'react';

export const SORT_KEY = 'q[s]';
const NEXT_DIRECTION = {
  asc: 'desc',
  desc: 'asc',
};

const formatSortingToFilter = ({ columnName, direction }) => {
  if (!columnName || !direction) return null;

  const formattedSorting = `${snakeCase(columnName)} ${direction}`;
  return {
    [SORT_KEY]: formattedSorting,
  };
};

export default function useSorting(sortedColumns = [], callback = () => {}, startingSort = {}) {
  const [sorting, setSorting] = useState(startingSort);

  const onSort = useCallback((column, sortInfo = {}) => {
    const { columnName = column.name, direction } = sortInfo;
    const newSorting = { columnName, direction: NEXT_DIRECTION[direction] || 'asc' };
    setSorting(newSorting);
  }, []);

  useEffect(() => {
    const ransackSorting = formatSortingToFilter(sorting);
    if (ransackSorting) {
      callback(ransackSorting);
    }
  }, [callback, sorting]);

  return [onSort, [sorting], sortedColumns, setSorting];
}
