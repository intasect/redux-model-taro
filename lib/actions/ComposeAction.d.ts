import { ComposeAction as BaseComponseAction, ComposeMeta } from '@redux-model/core';
export declare class ComposeAction<Data, Runner extends (...args: any[]) => Promise<any>> extends BaseComponseAction<Data, Runner> {
    useMeta(): ComposeMeta;
    useMeta<T extends keyof ComposeMeta>(key?: T): ComposeMeta[T];
    useLoading(): boolean;
    /**
     * @override
     */
    protected methods(): string[];
}
