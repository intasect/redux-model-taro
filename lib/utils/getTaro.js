"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTaro = void 0;
var DynamicTaro = process.env.TARO_ENV === 'h5'
    ? require('@tarojs/taro-h5')
    : require('@tarojs/taro');
exports.getTaro = function () {
    return DynamicTaro;
};
