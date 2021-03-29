import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

import configureStore from '../views/store';

export function renderWithStore(
  ui,
  { initialState = {}, store = configureStore(initialState), ...renderOptions } = {},
) {
  window.scrollTo = () => {};

  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  Wrapper.propTypes = { children: PropTypes.node.isRequired };

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

export function renderWithModal(Component, props = {}, renderOptions = {}) {
  window.scrollTo = () => {};

  const modalContainer = document.createElement('div');
  modalContainer.setAttribute('id', 'modal');

  const { initialState, store } = renderOptions;

  if (initialState || store) {
    return renderWithStore(<Component {...props} />, {
      container: document.body.appendChild(modalContainer),
      ...renderOptions,
    });
  }

  return render(<Component {...props} />, {
    container: document.body.appendChild(modalContainer),
    ...renderOptions,
  });
}
