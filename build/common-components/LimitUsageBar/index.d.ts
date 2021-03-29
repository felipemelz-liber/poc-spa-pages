import PropTypes from 'prop-types';
declare function LimitUsageBar({ item, onRemoveLimit }: {
    item: any;
    onRemoveLimit: any;
}): JSX.Element;
declare namespace LimitUsageBar {
    var propTypes: {
        item: PropTypes.Requireable<PropTypes.InferProps<{
            anticipationLimit: PropTypes.Requireable<PropTypes.InferProps<{
                takenValue: PropTypes.Requireable<string>;
                totalValue: PropTypes.Requireable<string>;
                usagePercent: PropTypes.Requireable<number>;
            }>>;
        }>>;
        onRemoveLimit: PropTypes.Requireable<(...args: any[]) => any>;
    };
    var defaultProps: {
        item: {
            anticipationLimit: {
                takenValue: string;
                totalValue: string;
                usagePercent: number;
            };
        };
        onRemoveLimit: () => void;
    };
}
export default LimitUsageBar;
