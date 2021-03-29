import React from 'react';
import { ThemeProvider } from 'styled-components';
import { LiberV4 as Theme, ToastContainer } from 'liber-components';

import BuyerAnticipationLimits from './components/BuyerAnticipationLimits';
import withTokenProvider from '../hocs/withTokenProvider';

function View() {
  return (
    <ThemeProvider theme={Theme}>
      <BuyerAnticipationLimits />
      <ToastContainer />
    </ThemeProvider>
  );
}

export default withTokenProvider(View);
