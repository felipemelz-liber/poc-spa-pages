import PropTypes from 'prop-types';
declare const ScreenTitle: {
    ({ handleBack, children }: {
        handleBack: any;
        children: any;
    }): JSX.Element;
    propTypes: {
        handleBack: PropTypes.Requireable<(...args: any[]) => any>;
        children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    };
    defaultProps: {
        handleBack: any;
        children: JSX.Element;
    };
};
export default ScreenTitle;
