import PropTypes from 'prop-types';
export declare const SortingDialog: {
    ({ open, onClose, sorting, setSorting, columns }: {
        open: any;
        onClose: any;
        sorting: any;
        setSorting: any;
        columns: any;
    }): JSX.Element;
    propTypes: {
        open: PropTypes.Requireable<boolean>;
        onClose: PropTypes.Requireable<(...args: any[]) => any>;
        sorting: PropTypes.Requireable<object[]>;
        setSorting: PropTypes.Requireable<(...args: any[]) => any>;
        columns: PropTypes.Requireable<PropTypes.InferProps<{
            label: PropTypes.Requireable<string>;
            value: PropTypes.Requireable<string>;
        }>[]>;
    };
    defaultProps: {
        open: boolean;
        onClose: () => any;
        sorting: any[];
        setSorting: () => any;
        columns: any[];
    };
};
export default SortingDialog;
