import PropTypes from 'prop-types';
declare const SelectTag: {
    ({ selected, onChange, children }: {
        selected: any;
        onChange: any;
        children: any;
    }): JSX.Element;
    propTypes: {
        onChange: PropTypes.Requireable<(...args: any[]) => any>;
        selected: PropTypes.Requireable<boolean>;
        children: PropTypes.Requireable<string>;
    };
    defaultProps: {
        onChange: () => void;
        selected: boolean;
        children: any;
    };
};
export default SelectTag;
