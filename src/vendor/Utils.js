import { camelCase } from 'lodash';
import PropTypes from 'prop-types';

import { toast } from 'liber-components/components/Toast';

export { default as Banks } from './constants/banks.json';
export { default as Countries } from './constants/countries.json';
export { default as EmissionIssuers } from './constants/emissionIssuers.json';
export { default as States } from './constants/states.json';
export { default as Cities } from './constants/cities.json';

const TOAST_DURATION = 5000;

export const paginationShape = PropTypes.shape({
  current: PropTypes.number,
  previous: PropTypes.number,
  next: PropTypes.number,
  per: PropTypes.number,
  pages: PropTypes.number,
  count: PropTypes.number,
});

export const capitalize = s =>
  s ? s.toLowerCase().replace(/(?:^|\s)\S/g, a => a.toUpperCase()) : s;

export const convertToCamelCase = object => {
  if (!!object && typeof object === 'object') {
    let convertedObject = {};

    if (Array.isArray(object)) {
      convertedObject = object.map(convertToCamelCase);
    } else {
      Object.keys(object).forEach(key => {
        const newKey = camelCase(key);
        convertedObject[newKey] = convertToCamelCase(object[key]);
      });
    }
    return convertedObject;
  }
  return object;
};

export const cleanTaxNumber = taxNumber => taxNumber?.replace(/\.|-|\//g, '');

export const isCNPJ = string => {
  const regex = /[0-9]{2}.?[0-9]{3}.?[0-9]{3}\/?[0-9]{4}-?[0-9]{2}/;

  return regex.test(string);
};

export const isCPF = string => {
  const regex = /[0-9]{3}.?[0-9]{3}.?[0-9]{3}-?[0-9]{2}/;

  return regex.test(string);
};

export const formatTaxNumber = taxNumber => {
  return isCNPJ(taxNumber) || isCPF(taxNumber) ? cleanTaxNumber(taxNumber) : taxNumber;
};

export const handleError = (
  message = 'Um erro ocorreu',
  info = 'Por favor tente novamente mais tarde ou entre em contato com o suporte',
) => {
  toast(
    {
      message,
      info,
    },
    'error',
    TOAST_DURATION,
  );
};

export const handleSuccess = (message = 'Sucesso', info = 'Sua ação foi executada com sucesso') => {
  toast(
    {
      message,
      info,
    },
    'success',
    TOAST_DURATION,
  );
};

export const getPaginationInterval = ({ current, per, total }) => {
  const end = current * per;
  const start = (current - 1) * per + 1;
  return { start: String(start), end: String(end > total ? total : end) };
};

export const dispatchDataLayerEvent = (event, isAdmin = false, additionalParams = {}) => {
  if (!isAdmin) {
    const dataLayer = global.dataLayer || [];
    dataLayer.push({ event, ...additionalParams });
  }
};

export const dispatchAmplitudeEvent = (event, additionalParams = {}) => {
  if (global.amplitude && event) {
    global.amplitude.logEvent(event, additionalParams);
  }
};

export function formatCnpjOrCpf(value) {
  const cnpjOrCpf = String(value).replace(/\D/g, '');

  const isCpf = cnpjOrCpf.length === 11;
  if (isCpf) {
    return cnpjOrCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4');
  }

  const isCnpj = cnpjOrCpf.length === 14;
  if (isCnpj) {
    return cnpjOrCpf.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, '$1.$2.$3/$4-$5');
  }

  return value;
}
