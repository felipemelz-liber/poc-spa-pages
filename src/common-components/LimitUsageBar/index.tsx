import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js';

import { Container, Info, FullBar, UsedBar, Button } from './styles';

function LimitUsageBar({ item, onRemoveLimit }) {
  const { anticipationLimit } = item;
  const { takenValue, totalValue, usagePercent } = anticipationLimit;

  return (
    <Container>
      <Info>
        {takenValue} de {totalValue}
      </Info>
      <FullBar>
        <UsedBar usagePercent={usagePercent} />
      </FullBar>
      <Button color="danger" size="small" onClick={() => onRemoveLimit(item)}>
        <Icon path={mdiClose} />
        Remover Limite
      </Button>
    </Container>
  );
}

LimitUsageBar.propTypes = {
  item: PropTypes.shape({
    anticipationLimit: PropTypes.shape({
      takenValue: PropTypes.string,
      totalValue: PropTypes.string,
      usagePercent: PropTypes.number,
    }),
  }),
  onRemoveLimit: PropTypes.func,
};

LimitUsageBar.defaultProps = {
  item: {
    anticipationLimit: {
      takenValue: 'R$ 0,00',
      totalValue: 'R$ 0,00',
      usagePercent: 0,
    },
  },
  onRemoveLimit: () => {},
};

export default LimitUsageBar;
