import { BaseRequestAction, Meta, Metas, MetasLoading, HttpServiceBuilder } from '@redux-model/core';
import { TaroRequestConfig } from '../services/HttpService';
export declare class RequestAction<Data, Builder extends (...args: any[]) => HttpServiceBuilder<Data, Response, Payload, TaroRequestConfig, M>, Response, Payload, M> extends BaseRequestAction<Data, Builder, Response, Payload, M> {
    useMeta(): Meta;
    useMeta<T extends keyof Meta>(key?: T): Meta[T];
    useMetas(): Metas<M>;
    useMetas(value: M): Meta;
    useMetas<T extends keyof Meta>(value: M, metaKey: T): Meta[T];
    useLoading(): boolean;
    useLoadings(): MetasLoading<M>;
    useLoadings(value: M): boolean;
    protected methods(): string[];
}
