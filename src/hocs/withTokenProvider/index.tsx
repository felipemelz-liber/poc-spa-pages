import React, { createContext } from 'react';
import PropTypes from 'prop-types';

export const TokenContext = createContext({});

function withTokenProvider(Component) {
  function WithTokenProvider(props) {
    const { token, ...rest } = props;

    return (
      <TokenContext.Provider value={{ token }}>
        <Component {...rest} />
      </TokenContext.Provider>
    );
  }

  WithTokenProvider.propTypes = {
    token: PropTypes.string,
  };

  WithTokenProvider.defaultProps = {
    token: '',
  };

  return WithTokenProvider;
}

export default withTokenProvider;
