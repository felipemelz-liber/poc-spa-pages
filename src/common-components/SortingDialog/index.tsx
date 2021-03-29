import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { SectionText, Column, Wrap, Line } from './styles';
import Dialog from '../Dialog/Dialog';
import SelectTag from '../SelectTag/SelectTag';

const directions = [
  { label: 'Ascendente', value: 'asc' },
  { label: 'Descendente', value: 'desc' },
];

export const SortingDialog = ({ open, onClose, sorting, setSorting, columns }) => {
  const [selected, setSelected] = useState(null);
  const [direction, setDirection] = useState(null);
  const [disabled, setDisabled] = useState(false);

  React.useEffect(() => {
    const [sortedColumn = {}] = sorting.filter(({ columnName }) =>
      columns.map(({ value }) => value).includes(columnName),
    );
    const { columnName, direction: selectedDirection } = sortedColumn;

    setSelected(columnName);
    setDirection(selectedDirection);
  }, [sorting]);

  React.useEffect(() => {
    setDisabled(!selected || !direction);
  }, [selected, direction]);

  const onConfirm = () => {
    setSorting({ columnName: selected, direction });
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="Ordenar Fornecedor"
      confirmationButtonProps={{ label: 'ORDENAR', onConfirm, disabled }}
    >
      <Column>
        <SectionText>Ordenar por</SectionText>
        <Wrap>
          {columns.map(({ label, value }) => (
            <SelectTag
              key={value}
              selected={selected === value}
              onChange={() => setSelected(value)}
            >
              {label}
            </SelectTag>
          ))}
        </Wrap>
        <SectionText>Ordem</SectionText>
        <Line>
          {directions.map(({ label, value }) => (
            <SelectTag
              key={value}
              selected={direction === value}
              onChange={() => setDirection(value)}
            >
              {label}
            </SelectTag>
          ))}
        </Line>
      </Column>
    </Dialog>
  );
};

SortingDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  sorting: PropTypes.arrayOf(PropTypes.object),
  setSorting: PropTypes.func,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    }),
  ),
};

SortingDialog.defaultProps = {
  open: false,
  onClose: () => null,
  sorting: [],
  setSorting: () => null,
  columns: [],
};

export default SortingDialog;
