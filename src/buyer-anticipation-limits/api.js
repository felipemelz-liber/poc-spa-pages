import axios from 'axios';
import { convertToCamelCase } from '../vendor/Utils';

import { SELECTED_TABLE_MAPPINGS } from './constants';

function formatGlobalResponse(data = {}) {
  const { anticipationLimit } = data;
  return {
    items: [{ anticipationLimit }],
  };
}

export async function fetchLimits(token = '', selectedTable = 'global', params = {}) {
  const response = await axios
    .get(SELECTED_TABLE_MAPPINGS[selectedTable].endpointUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    })
    .catch(() => {
      throw new Error();
    });

  const { data } = response;
  const formattedData = convertToCamelCase(data?.data || {});

  if (selectedTable === 'global') {
    return formatGlobalResponse(formattedData);
  }

  const items = formattedData[selectedTable];
  const { pagination } = formattedData;

  return { items, pagination };
}

export async function removeLimit(token = '', selectedTable = 'global', id) {
  return axios.delete(`${SELECTED_TABLE_MAPPINGS[selectedTable].endpointUrl}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function createOrUpdateLimit(token = '', selectedTable = 'global', item, value) {
  const anticipationId = item?.anticipationLimit?.id;

  const request = anticipationId ? axios.put : axios.post;
  let url = SELECTED_TABLE_MAPPINGS[selectedTable].endpointUrl;
  let params = {
    total_value: value,
  };

  if (anticipationId) {
    url += `/${anticipationId}`;
  } else if (selectedTable !== 'global') {
    const entityNameId = `${selectedTable.replace('s', '')}_id`;
    params = {
      ...params,
      [entityNameId]: item?.id,
    };
  }

  return request(url, params, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
