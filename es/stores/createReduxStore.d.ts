import { ReduxStoreConfig } from '@redux-model/core';
/**
 * The store engine for persist.
 *
 * `taro: shortcut of Taro.getStorage`
 *
 * `memory:  Promised object for testing`
 */
export declare const createReduxStore: (config?: ReduxStoreConfig<'taro' | 'memory'>) => import("redux").Store<any, import("redux").AnyAction>;
