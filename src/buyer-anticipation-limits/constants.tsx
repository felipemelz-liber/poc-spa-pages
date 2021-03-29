import React from 'react';
import { TooltipBox } from 'liber-components/components/Helpers';
import Icon from '@mdi/react';
import { mdiPencil } from '@mdi/js';

import { PaddingLeft, IconButton } from './components/CommonStyles';
import LimitUsageBar from '../common-components/LimitUsageBar';

export const domain = 'INVESTOR_DASHBORD_API'; // eslint-disable-line

export const BUYER_LIMITS_URL = `${domain}/api/v1/sacado/buyer_anticipation_limits`;
export const GLOBAL_LIMITS_URL = `${domain}/api/v1/sacado/global_anticipation_limits`;
export const FUNDER_LIMITS_URL = `${domain}/api/v1/sacado/funder_anticipation_limits`;

export const TABS = ['global', 'funders', 'buyers'];
export const SELECTED_TABLE_MAPPINGS = {
  global: {
    label: 'Limite',
    getCellValue: () => <PaddingLeft>Global</PaddingLeft>,
    endpointUrl: GLOBAL_LIMITS_URL,
    tabName: 'Global',
    sortedColumns: [],
  },
  buyers: {
    label: 'Sacado',
    getCellValue: item => {
      const { tradeName, cnpj } = item;
      return (
        <PaddingLeft>
          {tradeName}
          <br />
          {cnpj}
        </PaddingLeft>
      );
    },
    endpointUrl: BUYER_LIMITS_URL,
    tabName: 'Por sacado',
    sortedColumns: ['entity'],
  },
  funders: {
    label: 'Investidor',
    getCellValue: item => {
      const { tradeName, cnpj } = item;
      return (
        <PaddingLeft>
          {tradeName}
          <br />
          {cnpj}
        </PaddingLeft>
      );
    },
    endpointUrl: FUNDER_LIMITS_URL,
    tabName: 'Por investidor',
    sortedColumns: ['entity'],
  },
};

export const COLUMNS = (
  onRemoveLimit = () => {},
  onEditLimit = (item) => {},
  selectedTable = 'global',
) => [
  {
    name: 'entity',
    groupedColumns: ['tradeName', 'cnpj'],
    label: <>&nbsp;&nbsp;&nbsp;{SELECTED_TABLE_MAPPINGS[selectedTable].label}</>,
    width: 30,
    getCellValue: SELECTED_TABLE_MAPPINGS[selectedTable].getCellValue,
  },
  {
    name: 'anticipation_limit',
    label: 'Limite Tomado',
    width: 25,
    getCellValue: item => {
      const { anticipationLimit } = item;
      if (anticipationLimit) {
        return <LimitUsageBar item={item} onRemoveLimit={onRemoveLimit} />;
      }
      return 'Nenhum limite definido';
    },
  },
  {
    name: 'actions',
    label: 'Ações',
    width: 8,
    align: 'center',
    getCellValue: item => {
      return (
        <TooltipBox mount="top" fixed content="Editar limite">
          <IconButton onClick={() => onEditLimit(item)}>
            <Icon path={mdiPencil} />
          </IconButton>
        </TooltipBox>
      );
    },
  },
];

export const SORTING_DIALOG_COLUMNS = [
  { label: 'Nome', value: 'tradeName' },
  { label: 'CNPJ', value: 'cnpj' },
];

export const BUYERS_LIMITS_MOCK_RESPONSE = {
  data: {
    buyers: [
      {
        id: 193,
        cnpj: '86.575.843/0893-61',
        trade_name: 'BRF Aves',
        anticipation_limit: {
          id: 1,
          total_value: 'R$ 3.812.000,89',
          taken_value: 'R$ 2.056.153,04',
          usage_percent: 0.67,
        },
      },
      {
        id: 194,
        cnpj: '96.431.019/7581-45',
        trade_name: 'BRF Energia',
        anticipation_limit: null,
      },
      {
        id: 195,
        cnpj: '96.431.019/7581-46',
        trade_name: 'BRF Pet',
        anticipation_limit: {
          id: 2,
          total_value: 'R$ 9.056.153,04',
          taken_value: 'R$ 2.056.153,04',
          usage_percent: 0.24,
        },
      },
    ],
    pagination: {
      current: 1,
      previous: null,
      next: null,
      per: 10,
      pages: 1,
      count: 7,
    },
  },
};

export const FUNDERS_LIMITS_MOCK_RESPONSE = {
  data: {
    funders: [
      {
        id: 193,
        cnpj: '86.575.843/0893-61',
        trade_name: 'Bradesco',
        anticipation_limit: {
          id: 1,
          total_value: 'R$ 3.812.000,89',
          taken_value: 'R$ 2.056.153,04',
          usage_percent: 0.67,
        },
      },
      {
        id: 194,
        cnpj: '96.431.019/7581-45',
        trade_name: 'BTG Pactual',
        anticipation_limit: {
          id: 2,
          total_value: 'R$ 9.056.153,04',
          taken_value: 'R$ 2.056.153,04',
          usage_percent: 0.24,
        },
      },
    ],
    pagination: {
      current: 1,
      previous: null,
      next: null,
      per: 10,
      pages: 1,
      count: 7,
    },
  },
};

export const GLOBAL_LIMITS_MOCK_RESPONSE = {
  data: {
    anticipation_limit: {
      id: 77,
      total_value: 'R$ 3.812.000,89',
      taken_value: 'R$ 2.056.153,04',
      usage_percent: 0.67,
    },
  },
};
