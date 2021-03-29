import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { SuccessButton, LoadingSpinner } from 'liber-components';
import { LoadingContainer } from './LoadingButton.styles';

const LoadingButton = ({
  ButtonComponent,
  children,
  loading,
  onClick,
  disabled,
  size,
  spinnerColor,
  ...rest
}) => {
  const buttonRef = useRef(null);
  const [buttonWidth, setButtonWidth] = useState(0);

  useEffect(() => {
    setButtonWidth(buttonRef.current ? buttonRef.current.offsetWidth : 0);
  }, [buttonRef.current]);

  const getSpinnerSize = () => (size === 'small' ? '14px' : '22px');
  return (
    <ButtonComponent
      ref={buttonRef}
      size={size}
      version={2}
      onClick={onClick}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? (
        <LoadingContainer minWidth={buttonWidth - 32}>
          <LoadingSpinner color={spinnerColor} size={getSpinnerSize()} />
        </LoadingContainer>
      ) : (
        children
      )}
    </ButtonComponent>
  );
};

LoadingButton.propTypes = {
  ButtonComponent: PropTypes.elementType,
  children: PropTypes.node,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  spinnerColor: PropTypes.string,
};

LoadingButton.defaultProps = {
  ButtonComponent: SuccessButton,
  children: 'Botão',
  loading: false,
  onClick: () => null,
  disabled: false,
  size: 'medium',
  spinnerColor: 'white',
};

export default LoadingButton;
