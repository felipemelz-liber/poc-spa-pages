import PropTypes from 'prop-types';
declare const LoadingButton: {
    ({ ButtonComponent, children, loading, onClick, disabled, size, spinnerColor, ...rest }: {
        [x: string]: any;
        ButtonComponent: any;
        children: any;
        loading: any;
        onClick: any;
        disabled: any;
        size: any;
        spinnerColor: any;
    }): JSX.Element;
    propTypes: {
        ButtonComponent: PropTypes.Requireable<PropTypes.ReactComponentLike>;
        children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        loading: PropTypes.Requireable<boolean>;
        onClick: PropTypes.Requireable<(...args: any[]) => any>;
        disabled: PropTypes.Requireable<boolean>;
        size: PropTypes.Requireable<string>;
        spinnerColor: PropTypes.Requireable<string>;
    };
    defaultProps: {
        ButtonComponent: any;
        children: string;
        loading: boolean;
        onClick: () => any;
        disabled: boolean;
        size: string;
        spinnerColor: string;
    };
};
export default LoadingButton;
