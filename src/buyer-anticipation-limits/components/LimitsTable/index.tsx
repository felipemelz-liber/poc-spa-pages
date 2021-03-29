import React, { useState, useEffect, useContext, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { CompleteTable } from 'liber-components';

import { ScrollContainer, LimiterContainer, ConfirmationContent } from './styles';
import { Bunny, Loading } from '../CommonStyles';
import usePagination from '../../../hooks/usePagination';
import usePageState from '../../../hooks/usePageState';
import { getPaginationInterval, handleError } from '../../../vendor/Utils';
import { COLUMNS, SELECTED_TABLE_MAPPINGS, SORTING_DIALOG_COLUMNS } from '../../constants';
import { fetchLimits, removeLimit } from '../../api';
import { TokenContext } from '../../../hocs/withTokenProvider';
import useSorting from '../../../hooks/useSorting';
import SortingDialog from '../../../common-components/SortingDialog';
import Dialog from '../../../common-components/Dialog/Dialog';
import EditLimitModal from '../EditLimitModal';

function LimitsTable({ selectedTable }) {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [sortingFilter, setSortingFilter] = useState({});
  const [showSortingDialog, setShowSortingDialog] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [editingOpen, setEditingOpen] = useState(false);
  const [removingLimit, setRemovingLimit] = useState(false);
  const [selectedItem, setSelectedItem] = useState({anticipationLimit: null, tradeName: ""});

  const { pagination, setCurrent, onSelectListing, updatePagination } = usePagination();
  const { pages, current, next, previous, count, per } = pagination;
  const [currentPage, setPageState, onKeyDownPage] = usePageState(current, pages, setCurrent);

  const sortingColumns = useMemo(() => SELECTED_TABLE_MAPPINGS[selectedTable].sortedColumns, [
    selectedTable,
  ]);

  const [onSort, sorting, sortedColumns, setSorting] = useSorting(
    sortingColumns,
    setSortingFilter,
    {},
  );

  const handleSorting = (column, sortInfo = {}) => {
    if (column?.name === 'entity') {
      setShowSortingDialog(true);
    } else {
      onSort(column, sortInfo);
    }
  };

  const token = '123';

  const updateLimits = () => {
    setLoading(true);
    setItems([]);
    fetchLimits(token, selectedTable, { page: current, per, ...sortingFilter })
      .then(response => {
        const { items: incomingItems, pagination: incomingPagination } = response;

        if (incomingPagination) {
          updatePagination({ ...incomingPagination, per });
        }

        setItems(incomingItems);
        setLoading(false);
      })
      .catch(() => {
        handleError();
        setLoading(false);
      });
  };

  useEffect(() => {
    updateLimits();
  }, [per, current, sortingFilter, selectedTable]);

  const handleConfirmRemoval = () => {
    setRemovingLimit(true);
    removeLimit(token, selectedTable, selectedItem?.anticipationLimit?.id)
      .then(() => {
        setConfirmationOpen(false);
        setRemovingLimit(false);
        updateLimits();
      })
      .catch(() => {
        handleError();
        setRemovingLimit(false);
      });
  };

  const confirmationDialogProps = useMemo(
    () => ({
      open: confirmationOpen,
      onClose: () => setConfirmationOpen(false),
      confirmationButtonProps: {
        onConfirm: handleConfirmRemoval,
        label: 'REMOVER',
        color: 'danger',
        disabled: false,
        loading: removingLimit,
      },
      title: 'Remover Limite',
      children: (
        <ConfirmationContent>
          {selectedTable === 'global' ? (
            <>Tem certeza de que deseja remover o limite global aplicado?</>
          ) : (
            <>Tem certeza de que deseja remover o limite aplicado a {selectedItem?.tradeName}?</>
          )}
        </ConfirmationContent>
      ),
    }),
    [selectedItem, confirmationOpen, removingLimit, selectedTable],
  );

  const onRemoveLimitClick = useCallback(() => {
    //setSelectedItem(item);
    setConfirmationOpen(true);
  }, []);

  const onEditLimitClick = useCallback(() => {
    //setSelectedItem(item);
    setEditingOpen(true);
  }, []);

  const columns = useMemo(() => COLUMNS(onRemoveLimitClick, onEditLimitClick, selectedTable), [
    selectedTable,
  ]);

  return (
    <Loading loading={loading ? 1 : 0}>
      {loading ? <Bunny /> : null}
      <ScrollContainer>
        <LimiterContainer>
          <CompleteTable
            columns={columns}
            items={items || []}
            paginationProps={{
              currentPage,
              pageTotal: pages,
              onChangePage: ({ target: { value } }) => setPageState(value),
              onClickNext: () => setCurrent(next),
              onClickPrev: () => setCurrent(previous),
              onKeyDownPage,
              hasListing: true,
              listingProps: {
                listing: String(per),
                total: String(count),
                showInterval: getPaginationInterval(pagination),
                onSelectListing,
                listingLabelSingular: 'limite',
                listingLabelPlural: 'limites',
              },
            }}
            sortingProps={
              sortingColumns.length ? { onSort: handleSorting, sorting, sortedColumns } : undefined
            }
          />
          <SortingDialog
            open={showSortingDialog}
            onClose={() => setShowSortingDialog(false)}
            sorting={sorting}
            setSorting={setSorting}
            columns={SORTING_DIALOG_COLUMNS}
          />
          <Dialog {...confirmationDialogProps} />
          <EditLimitModal
            onLeaved={() => setEditingOpen(false)}
            show={editingOpen}
            onUpdate={updateLimits}
            selectedTable={selectedTable}
            item={selectedItem}
            currentValue={selectedItem?.anticipationLimit?.totalValue || ''}
          />
        </LimiterContainer>
      </ScrollContainer>
    </Loading>
  );
}

LimitsTable.propTypes = {
  selectedTable: PropTypes.string,
};

LimitsTable.defaultProps = {
  selectedTable: 'global',
};

export default LimitsTable;
