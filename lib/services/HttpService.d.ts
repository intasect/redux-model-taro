import Taro from '@tarojs/taro';
import { BaseHttpService, HttpServiceBuilderWithMeta, PickPayload, PickResponse, HttpServiceBuilderWithMetas, PickData, PickMeta, IBaseRequestAction, BaseHttpServiceConfig, HttpTransform, FetchHandle as SuperFetchHandle } from '@redux-model/core';
import { RequestAction } from '../actions/RequestAction';
export declare type TaroRequestConfig<T = any> = Partial<Taro.request.Option<T>>;
export declare type HttpResponse<T = any> = Taro.request.SuccessCallbackResult<T>;
export declare type HttpCanceler = () => void;
export interface FetchHandle<Response = any, Payload = any> extends SuperFetchHandle<Response, Payload, HttpCanceler> {
}
export interface HttpServiceConfig<ErrorData> extends BaseHttpServiceConfig {
    /**
     * Taro original config
     */
    requestOptions?: TaroRequestConfig;
    /**
     * Collect http-status, error-message and business-code to meta. And error-message will display by invoke method `onShowError`.
     *
     * ```javascript
     * {
     *   onRespondError(httpResponse, meta) {
     *     if (httpResponse.data && httpResponse.data.errMsg) {
     *       meta.message = httpResponse.data.errMsg;
     *     }
     *
     *     // If http-status is always 200 and the api put real http-status into your data.
     *     if (httpResponse.data && httpResponse.data.status) {
     *       meta.httpStatus = httpResponse.data.status;
     *     }
     *   }
     * }
     * ```
     *
     * And how to get error information in your component?
     * ```javascript
     * const meta = xModel.yAction.useMeta(); // object includes message, httpStatus, businessCode...
     * ```
     */
    onRespondError: (httpResponse: HttpResponse<ErrorData>, meta: HttpTransform) => void;
    /**
     * Transform your data globally.
     *
     * Consider that you have common struct for most api `{ data: {...} }`, you are boring to use literal `data` again and again, so you want to strip it.
     * ```javascript
     * {
     *   onRespondSuccess(httpResponse) {
     *     if (httpResponse.data.data) {
     *       httpResponse.data = httpResponse.data.data;
     *     }
     *   }
     * }
     * ```
     */
    onRespondSuccess?: (httpResponse: HttpResponse) => void;
    /**
     * Inject headers for every request.
     * ```javascript
     * import type { TokenModel } from '../../models/TokenModel';
     *
     * {
     *   headers() {
     *     const token = (require('../../models/TokenModel').tokenModel as TokenModel).data.access_token;
     *
     *     return {
     *       Authorization: `Bearer ${token}`,
     *       Accept: 'application/json',
     *       'Content-Encoding': 'application/json',
     *     };
     *   }
     * }
     * ```
     */
    headers: (action: IRequestAction) => object;
    /**
     * Before request, you can inject or modify data as your wish.
     */
    beforeSend?: (action: IRequestAction) => void;
    /**
     * When the api puts httpStatus to your data struct such as `{ status: 400, msg: ..., data: ... }`, unfortunately, we only recognize standard httpStatus. At this time, you have to judge by yourself.
     *
     * ```javascript
     * {
     *   isSuccess(httpResponse) {
     *     const status = httpResponse.data && httpResponse.data.status;
     *
     *     return status >= 200 && status < 300;
     *   }
     * }
     * ```
     */
    isSuccess?: (httpResponse: HttpResponse) => boolean;
}
export interface IRequestAction<Data = any, Response = any, Payload = any> extends IBaseRequestAction<Data, Response, Payload> {
    requestOptions: TaroRequestConfig;
}
export declare class HttpService<ErrorData = any> extends BaseHttpService<HttpServiceConfig<ErrorData>, HttpCanceler> {
    protected readonly request: typeof Taro.request;
    constructor(config: HttpServiceConfig<ErrorData>);
    clone<NewErrorData = ErrorData>(config: Partial<HttpServiceConfig<NewErrorData>>): HttpService<NewErrorData>;
    action<Fn extends (...args: any[]) => HttpServiceBuilderWithMeta<Data, Response, Payload, TaroRequestConfig>, Data = PickData<Fn>, Response = PickResponse<Fn>, Payload = PickPayload<Fn>>(fn: Fn): ((...args: Parameters<Fn>) => FetchHandle<Response, Payload>) & Omit<RequestAction<Data, Fn, Response, Payload, true>, 'metas' | 'loadings' | 'useMetas' | 'useLoadings'>;
    action<Fn extends (...args: any[]) => HttpServiceBuilderWithMetas<Data, Response, Payload, TaroRequestConfig, M>, Data = PickData<Fn>, Response = PickResponse<Fn>, Payload = PickPayload<Fn>, M = PickMeta<Fn>>(fn: Fn): ((...args: Parameters<Fn>) => FetchHandle<Response, Payload>) & Omit<RequestAction<Data, Fn, Response, Payload, M>, 'meta' | 'loading' | 'useMeta' | 'useLoading'>;
    protected runAction(action: IRequestAction): FetchHandle;
}
