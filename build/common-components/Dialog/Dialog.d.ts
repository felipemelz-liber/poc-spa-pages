import PropTypes from 'prop-types';
declare const Dialog: {
    ({ open, onClose, confirmationButtonProps, title, children, cancelLabel }: {
        open: any;
        onClose: any;
        confirmationButtonProps: any;
        title: any;
        children: any;
        cancelLabel: any;
    }): JSX.Element;
    propTypes: {
        open: PropTypes.Requireable<boolean>;
        onClose: PropTypes.Requireable<(...args: any[]) => any>;
        confirmationButtonProps: PropTypes.Requireable<PropTypes.InferProps<{
            onConfirm: PropTypes.Requireable<(...args: any[]) => any>;
            label: PropTypes.Requireable<string>;
            color: PropTypes.Requireable<string>;
            disabled: PropTypes.Requireable<boolean>;
            loading: PropTypes.Requireable<boolean>;
        }>>;
        title: PropTypes.Requireable<string>;
        children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        cancelLabel: PropTypes.Requireable<string>;
    };
    defaultProps: {
        open: boolean;
        onClose: () => void;
        confirmationButtonProps: {
            onConfirm: () => void;
            label: string;
            color: string;
            disabled: boolean;
            loading: boolean;
        };
        title: string;
        children: any;
        cancelLabel: string;
    };
};
export default Dialog;
