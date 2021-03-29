import PropTypes from 'prop-types';
declare function EditLimitModal({ onLeaved, show, onUpdate, selectedTable, item, currentValue }: {
    onLeaved: any;
    show: any;
    onUpdate: any;
    selectedTable: any;
    item: any;
    currentValue: any;
}): JSX.Element;
declare namespace EditLimitModal {
    var propTypes: {
        onLeaved: PropTypes.Requireable<(...args: any[]) => any>;
        show: PropTypes.Requireable<boolean>;
        onUpdate: PropTypes.Requireable<(...args: any[]) => any>;
        selectedTable: PropTypes.Requireable<string>;
        item: PropTypes.Requireable<PropTypes.InferProps<{
            tradeName: PropTypes.Requireable<string>;
            id: PropTypes.Requireable<number>;
            anticipationLimit: PropTypes.Requireable<PropTypes.InferProps<{
                id: PropTypes.Requireable<number>;
            }>>;
        }>>;
        currentValue: PropTypes.Requireable<string>;
    };
    var defaultProps: {
        onLeaved: () => void;
        show: boolean;
        onUpdate: () => void;
        selectedTable: string;
        item: {};
        currentValue: string;
    };
}
export default EditLimitModal;
