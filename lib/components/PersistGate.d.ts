import { PureComponent, ReactNode } from 'react';
interface Props {
    loading?: ReactNode;
}
declare type State = Readonly<{
    isReady: boolean;
}>;
export declare class PersistGate extends PureComponent<Props, State> {
    static defaultProps: {
        loading: null;
    };
    protected unlisten?: Function;
    readonly state: State;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): ReactNode;
}
export {};
