import PropTypes from 'prop-types';
declare function LimitsTable({ selectedTable }: {
    selectedTable: any;
}): JSX.Element;
declare namespace LimitsTable {
    var propTypes: {
        selectedTable: PropTypes.Requireable<string>;
    };
    var defaultProps: {
        selectedTable: string;
    };
}
export default LimitsTable;
