"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReduxStore = void 0;
var tslib_1 = require("tslib");
var core_1 = require("@redux-model/core");
var taroStorage_1 = tslib_1.__importDefault(require("../storages/taroStorage"));
/**
 * The store engine for persist.
 *
 * `taro: shortcut of Taro.getStorage`
 *
 * `memory:  Promised object for testing`
 */
exports.createReduxStore = function (config) {
    if (config === void 0) { config = {}; }
    var persist = config.persist;
    if (persist && persist.storage === 'taro') {
        persist.storage = taroStorage_1.default;
    }
    return core_1.storeHelper.createStore(config);
};
