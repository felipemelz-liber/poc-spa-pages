export declare const domain = "INVESTOR_DASHBORD_API";
export declare const BUYER_LIMITS_URL: string;
export declare const GLOBAL_LIMITS_URL: string;
export declare const FUNDER_LIMITS_URL: string;
export declare const TABS: string[];
export declare const SELECTED_TABLE_MAPPINGS: {
    global: {
        label: string;
        getCellValue: () => JSX.Element;
        endpointUrl: string;
        tabName: string;
        sortedColumns: any[];
    };
    buyers: {
        label: string;
        getCellValue: (item: any) => JSX.Element;
        endpointUrl: string;
        tabName: string;
        sortedColumns: string[];
    };
    funders: {
        label: string;
        getCellValue: (item: any) => JSX.Element;
        endpointUrl: string;
        tabName: string;
        sortedColumns: string[];
    };
};
export declare const COLUMNS: (onRemoveLimit?: () => void, onEditLimit?: (item: any) => void, selectedTable?: string) => ({
    name: string;
    groupedColumns: string[];
    label: JSX.Element;
    width: number;
    getCellValue: any;
    align?: undefined;
} | {
    name: string;
    label: string;
    width: number;
    getCellValue: (item: any) => JSX.Element | "Nenhum limite definido";
    groupedColumns?: undefined;
    align?: undefined;
} | {
    name: string;
    label: string;
    width: number;
    align: string;
    getCellValue: (item: any) => JSX.Element;
    groupedColumns?: undefined;
})[];
export declare const SORTING_DIALOG_COLUMNS: {
    label: string;
    value: string;
}[];
export declare const BUYERS_LIMITS_MOCK_RESPONSE: {
    data: {
        buyers: {
            id: number;
            cnpj: string;
            trade_name: string;
            anticipation_limit: {
                id: number;
                total_value: string;
                taken_value: string;
                usage_percent: number;
            };
        }[];
        pagination: {
            current: number;
            previous: any;
            next: any;
            per: number;
            pages: number;
            count: number;
        };
    };
};
export declare const FUNDERS_LIMITS_MOCK_RESPONSE: {
    data: {
        funders: {
            id: number;
            cnpj: string;
            trade_name: string;
            anticipation_limit: {
                id: number;
                total_value: string;
                taken_value: string;
                usage_percent: number;
            };
        }[];
        pagination: {
            current: number;
            previous: any;
            next: any;
            per: number;
            pages: number;
            count: number;
        };
    };
};
export declare const GLOBAL_LIMITS_MOCK_RESPONSE: {
    data: {
        anticipation_limit: {
            id: number;
            total_value: string;
            taken_value: string;
            usage_percent: number;
        };
    };
};
