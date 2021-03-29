import React from 'react';
import PropTypes from 'prop-types';
import { render, waitFor } from '@testing-library/react';

import withScreenSize from '..';

function MockComponent({ screenSize }) {
  return (
    <p>
      The screen size is: <b>{screenSize}</b>
    </p>
  );
}
MockComponent.propTypes = { screenSize: PropTypes.string.isRequired };

describe('withScreenSize tests', () => {
  const widths = [400, 700, 900, 1100, 1300];
  const sizes = ['small', 'small', 'medium', 'large', 'extraLarge'];

  widths.forEach(async (width, index) => {
    it(`should set screenSize prop as '${sizes[index]}' for ${width}px screen width`, async () => {
      global.window.innerWidth = width;

      const WrappedComponent = withScreenSize(MockComponent);

      const { findByText } = render(<WrappedComponent />);

      await waitFor(() => findByText(sizes[index]));
    });
  });
});
