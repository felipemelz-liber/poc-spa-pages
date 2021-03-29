import React, { useState, useContext, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'liber-components';

import { TokenContext } from '../../../hocs/withTokenProvider';
import { Container, Header, Content, InputText, ActionsRow, Button } from './styles';
import { handleError, handleSuccess } from '../../../vendor/Utils';
import LoadingButton from '../../../common-components/Buttons/LoadingButton';
import { createOrUpdateLimit } from '../../api';

const convertToFloat = value => parseFloat(value.replace(',', '.'));
const onlyNumbersAndComma = value => value.replace(/[^0-9,]/g, '');

function EditLimitModal({ onLeaved, show, onUpdate, selectedTable, item, currentValue }) {
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);

  const token = '123';

  const handleValueChange = value => {
    const willReceiveMoreThanOneComma = value.match(/,/g)?.length > 1;

    if (!willReceiveMoreThanOneComma) {
      setInputValue(onlyNumbersAndComma(value));
    }
  };

  useEffect(() => {
    if (show) {
      handleValueChange(currentValue);
    } else {
      setInputValue('');
      setLoading(false);
    }
  }, [show]);

  const handleUpdateLimit = () => {
    setLoading(true);
    createOrUpdateLimit(token, selectedTable, item, convertToFloat(inputValue))
      .then(() => {
        handleSuccess(
          'O limite foi atualizado com sucesso!',
          'Se necessário, altere-o na coluna "Ações".',
        );
        onUpdate();
        onLeaved();
      })
      .catch(error => {
        handleError('Erro!', error?.response?.data?.error);
        setLoading(false);
      });
  };

  const isGlobal = useMemo(() => selectedTable === 'global', [selectedTable]);

  return (
    <Modal show={show} onLeaved={onLeaved}>
      <Container>
        <Header>Atualizar Limites</Header>
        <Content>
          {isGlobal ? (
            <>
              O limite global considera todas operações no portal. Ao excedê-lo, nenhuma outra
              operação será permitida no mês.
              <br />
              <br />
              Digite o novo valor de limite global mensal.
            </>
          ) : (
            <>Digite o novo valor de limite mensal para {item?.tradeName}.</>
          )}
        </Content>

        <InputText
          prefix="R$"
          label="Limite mensal"
          value={inputValue}
          onChange={handleValueChange}
          data-testid="update-limit-input"
        />

        <ActionsRow>
          <Button onClick={onLeaved}>FECHAR</Button>
          <LoadingButton
            ButtonComponent={Button}
            spinnerColor="#009dff"
            loading={loading}
            onClick={handleUpdateLimit}
            disabled={!inputValue}
            size="small"
          >
            ATUALIZAR
          </LoadingButton>
        </ActionsRow>
      </Container>
    </Modal>
  );
}

EditLimitModal.propTypes = {
  onLeaved: PropTypes.func,
  show: PropTypes.bool,
  onUpdate: PropTypes.func,
  selectedTable: PropTypes.string,
  item: PropTypes.shape({
    tradeName: PropTypes.string,
    id: PropTypes.number,
    anticipationLimit: PropTypes.shape({
      id: PropTypes.number,
    }),
  }),
  currentValue: PropTypes.string,
};

EditLimitModal.defaultProps = {
  onLeaved: () => {},
  show: true,
  onUpdate: () => {},
  selectedTable: 'global',
  item: {},
  currentValue: '',
};

export default EditLimitModal;
