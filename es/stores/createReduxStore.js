import { storeHelper } from '@redux-model/core';
import taro from '../storages/taroStorage';
/**
 * The store engine for persist.
 *
 * `taro: shortcut of Taro.getStorage`
 *
 * `memory:  Promised object for testing`
 */
export var createReduxStore = function (config) {
    if (config === void 0) { config = {}; }
    var persist = config.persist;
    if (persist && persist.storage === 'taro') {
        persist.storage = taro;
    }
    return storeHelper.createStore(config);
};
