import React from 'react';
import PropTypes from 'prop-types';
export declare const TokenContext: React.Context<{}>;
declare function withTokenProvider(Component: any): {
    (props: any): JSX.Element;
    propTypes: {
        token: PropTypes.Requireable<string>;
    };
    defaultProps: {
        token: string;
    };
};
export default withTokenProvider;
