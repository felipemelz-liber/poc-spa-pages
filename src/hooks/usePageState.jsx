import React from 'react';

const usePageState = (currentPage, pageTotal, goToPage) => {
  const [page, setPage] = React.useState(currentPage);

  React.useEffect(() => {
    if (page !== currentPage) {
      setPage(currentPage);
    }
  }, [currentPage]);

  const onKeyDown = ({ key, target: { value } }) => {
    if (key === 'Enter') {
      const intValue = parseInt(value, 10);
      if (intValue > 0 && intValue <= pageTotal) {
        goToPage(intValue);
      } else {
        setPage(currentPage);
      }
    }
  };

  return [page, setPage, onKeyDown];
};

export default usePageState;
