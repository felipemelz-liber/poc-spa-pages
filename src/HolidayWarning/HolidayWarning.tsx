import React from 'react';
import moment from 'moment';
import { ThemeProvider } from 'styled-components';
import { LiberV4, Text } from 'liber-components';

import { Container, FlashAlert } from './styles';

const carnivalDate = moment('18/02/2021', 'DD/MM/YYYY');
const advancedHolidayDate = moment('05/04/2021', 'DD/MM/YYYY');

function View() {
  const carnival = () => moment().startOf('day').isBefore(carnivalDate);
  const advancedHoliday = () => moment().startOf('day').isBefore(advancedHolidayDate);

  return (
    <ThemeProvider theme={LiberV4}>
      {carnival() ? (
        <Container>
          <FlashAlert>
            <Text large>
              <b>Atenção:</b> teremos horários especiais no Carnaval: dia 15/02 e 16/02{' '}
              <b>não teremos expediente</b> e 17/02 expediente <b>a partir de 12h</b>.
            </Text>
          </FlashAlert>
        </Container>
      ) : null}
      {advancedHoliday() ? (
        <Container>
          <FlashAlert>
            <Text large>
              <b>Atenção:</b> apesar dos feriados antecipados em São Paulo de 26/03 a 04/04, teremos <b>expediente normal</b> neste período.
            </Text>
          </FlashAlert>
        </Container>
      ) : null}
    </ThemeProvider>
  );
}

export default View;
