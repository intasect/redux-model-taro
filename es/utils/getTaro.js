var DynamicTaro = process.env.TARO_ENV === 'h5'
    ? require('@tarojs/taro-h5')
    : require('@tarojs/taro');
export var getTaro = function () {
    return DynamicTaro;
};
