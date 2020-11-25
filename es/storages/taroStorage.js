import { getTaro } from '../utils/getTaro';
var TaroJS = getTaro();
var taro = {
    getItem: function (key) {
        return Promise.resolve().then(function () {
            try {
                var data = TaroJS.getStorageSync(key);
                if (data === '') {
                    return null;
                }
                return typeof data === 'string' ? data : null;
            }
            catch (e) {
                // Mini program will throw error when key is not found.
                return null;
            }
        });
    },
    setItem: function (key, value) {
        return Promise.resolve().then(function () {
            return TaroJS.setStorageSync(key, value);
        });
    },
};
export default taro;
