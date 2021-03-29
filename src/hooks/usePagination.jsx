import { useReducer } from 'react';

const paginationReducer = (state, values = {}) => {
  const newState = { ...state };
  Object.keys(values).forEach(key => {
    newState[key] = values[key];
  });
  return newState;
};

const initialPagination = {
  current: 1,
  previous: null,
  next: null,
  per: 10,
  pages: 1,
  count: 0,
};

function usePagination() {
  const [pagination, updatePagination] = useReducer(paginationReducer, initialPagination);

  const setCurrent = current => updatePagination({ current });

  const onSelectListing = listing => updatePagination({ per: parseInt(listing, 10) });

  return { pagination, setCurrent, onSelectListing, updatePagination };
}

export default usePagination;
