import React, { useContext } from 'react';
import { render, waitFor } from '@testing-library/react';

import withTokenProvider, { TokenContext } from '..';

function MockComponent() {
  const { token } = useContext(TokenContext);
  return (
    <p>
      The token from context is: <b>{token}</b>
    </p>
  );
}

function MockRootComponent() {
  return <MockComponent />;
}

const WrappedComponent = withTokenProvider(MockRootComponent);

describe('withTokenProvider tests', () => {
  it('should pass the correct token to child component with TokenContext ', async () => {
    const { findByText } = render(<WrappedComponent token="this-is-my-token" />);

    await waitFor(() => findByText('this-is-my-token'));
  });
});
