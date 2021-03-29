import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { getScreenSize } from 'liber-components';

function withScreenSize(Component) {
  function WithScreenSize(props) {
    const [screenSize, setScreenSize] = useState(getScreenSize(window));

    const resize = useCallback(() => setScreenSize(getScreenSize(window)));

    useEffect(() => {
      window.addEventListener('resize', resize);
      return () => window.removeEventListener('resize', resize);
    }, []);

    return <Component screenSize={screenSize} {...props} />;
  }

  WithScreenSize.propTypes = {
    screenSize: PropTypes.oneOf(['small', 'medium', 'large', 'extraLarge']).isRequired,
  };

  return WithScreenSize;
}

export default withScreenSize;
