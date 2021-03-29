import React from 'react';
import PropTypes from 'prop-types';
import { Modal, FlatButton } from 'liber-components';
import { DialogHeader, Title, DialogContent, DialogActions } from './Dialog.styles';
import LoadingButton from '../Buttons/LoadingButton';

const Dialog = ({ open, onClose, confirmationButtonProps, title, children, cancelLabel }) => {
  const { label, onConfirm, color, disabled, loading } = confirmationButtonProps;
  return (
    <Modal show={open} onLeaved={onClose}>
      <DialogHeader>
        <Title>{title}</Title>
      </DialogHeader>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <FlatButton onClick={onClose}>{cancelLabel}</FlatButton>
        <LoadingButton
          ButtonComponent={FlatButton}
          color={color}
          onClick={onConfirm}
          disabled={disabled}
          loading={loading}
          spinnerColor={color === 'primary' ? '#009dff' : '#da2d16'}
          size="small"
        >
          {label || 'CONTINUAR'}
        </LoadingButton>
      </DialogActions>
    </Modal>
  );
};

Dialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  confirmationButtonProps: PropTypes.shape({
    onConfirm: PropTypes.func,
    label: PropTypes.string,
    color: PropTypes.oneOf(['primary', 'danger']),
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
  }),
  title: PropTypes.string,
  children: PropTypes.node,
  cancelLabel: PropTypes.string,
};

Dialog.defaultProps = {
  open: false,
  onClose: () => {},
  confirmationButtonProps: {
    onConfirm: () => {},
    label: 'CONTINUAR',
    color: 'primary',
    disabled: false,
    loading: false,
  },
  title: '',
  children: null,
  cancelLabel: 'CANCELAR',
};

export default Dialog;
