"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpService = void 0;
var tslib_1 = require("tslib");
var qs_1 = require("qs");
var core_1 = require("@redux-model/core");
var promise_listen_catch_1 = tslib_1.__importDefault(require("promise-listen-catch"));
var RequestAction_1 = require("../actions/RequestAction");
var getTaro_1 = require("../utils/getTaro");
var parseFetch_1 = require("../utils/parseFetch");
var HttpService = /** @class */ (function (_super) {
    tslib_1.__extends(HttpService, _super);
    function HttpService(config) {
        var _this = _super.call(this, config) || this;
        _this.request = getTaro_1.getTaro().request;
        return _this;
    }
    HttpService.prototype.clone = function (config) {
        // @ts-ignore
        // @ts-expect-error
        return new HttpService(tslib_1.__assign(tslib_1.__assign({}, this.config), config));
    };
    HttpService.prototype.action = function (fn) {
        return new RequestAction_1.RequestAction(fn, this);
    };
    HttpService.prototype.runAction = function (action) {
        var _this = this;
        var config = this.config;
        config.beforeSend && config.beforeSend(action);
        // For service.xxxAsync(), prepare, success and fail are all empty string.
        var _a = action.type, prepare = _a.prepare, success = _a.success, fail = _a.fail;
        var requestOptions = tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({ url: action.uri, method: action.method }, config.requestOptions), action.requestOptions), { header: tslib_1.__assign(tslib_1.__assign({}, config.headers(action)), action.requestOptions.header) });
        var url = requestOptions.url;
        // Make sure url is not absolute link
        if (!~url.indexOf('://')) {
            url = config.baseUrl + url;
        }
        var throttleUrl = url;
        if (action.query) {
            var isArg = ~url.indexOf('?') ? '&' : '?';
            var args = qs_1.stringify(action.query, {
                arrayFormat: 'brackets',
                encodeValuesOnly: true,
            });
            url += "" + isArg + args;
        }
        requestOptions.url = url;
        // For GET request, `requestOptions.data` will convert to queryString.
        if (action.method !== core_1.METHOD.get && action.body) {
            requestOptions.data = action.body;
        }
        prepare && core_1.storeHelper.dispatch(tslib_1.__assign(tslib_1.__assign({}, action), { type: prepare, loading: true, effect: action.onPrepare, after: action.afterPrepare, afterDuration: action.afterPrepareDuration }));
        var throttleData = this.getThrottleData(action, {
            url: throttleUrl,
            actionName: action.actionName,
            method: action.method,
            body: action.body,
            query: action.query,
            headers: requestOptions.header,
            transfer: action.throttle.transfer,
        });
        if (throttleData) {
            return throttleData;
        }
        var successInvoked = false;
        var canceler;
        var fetchAbort;
        // H5 fetch() doesn't support abort
        if (process.env.TARO_ENV === 'h5' && typeof AbortController === 'function') {
            fetchAbort = new AbortController();
            // @ts-ignore
            requestOptions.signal = fetchAbort.signal;
            // Be careful to keep scope
            canceler = fetchAbort.abort.bind(fetchAbort);
        }
        var task = this.request(requestOptions);
        // H5 fetch() doesn't support abort
        if (!canceler && task.abort) {
            canceler = task.abort.bind(task);
        }
        var promise = task
            .then(function (httpResponse) {
            if (httpResponse.statusCode < 200 || httpResponse.statusCode >= 300 || (config.isSuccess && !config.isSuccess(httpResponse))) {
                return Promise.reject(httpResponse);
            }
            if (config.onRespondSuccess) {
                config.onRespondSuccess(httpResponse);
            }
            var okAction = tslib_1.__assign(tslib_1.__assign({}, action), { type: success, loading: false, response: httpResponse.data, effect: action.onSuccess, after: action.afterSuccess, afterDuration: action.afterSuccessDuration });
            successInvoked = true;
            success && core_1.storeHelper.dispatch(okAction);
            _this.setThrottle(okAction);
            _this.triggerShowSuccess(okAction, action.successText);
            return Promise.resolve(okAction);
        })
            .catch(function (error) {
            if (successInvoked) {
                return Promise.reject(error);
            }
            // H5     ok => statusCode | error => status
            // Weapp  ok => statusCode | error => statusCode
            // ...
            if (error.status && !error.statusCode) {
                error.statusCode = error.status;
            }
            /**
             * H5 throws original response when fail.
             * @see ./node_modules/@tarojs/taro-h5/src/api/request/index.js
             **/
            if (error.statusCode && !error.hasOwnProperty('data')) {
                return new Promise(function (_, reject) {
                    parseFetch_1.parseFetch(requestOptions, error).then(function (data) {
                        error.data = data;
                        reject(error);
                    });
                });
            }
            return Promise.reject(error);
        })
            .catch(function (error) {
            if (successInvoked) {
                return Promise.reject(error);
            }
            var errMsg = error.errMsg;
            var isCancel = false;
            var errorMessage;
            var httpStatus;
            var businessCode;
            if (
            // @ts-ignore
            (fetchAbort && error.name === 'AbortError')
                ||
                    (errMsg && /abort/i.test(errMsg))) {
                isCancel = true;
            }
            if (isCancel) {
                errorMessage = 'Aborted';
            }
            else if (error.statusCode) {
                var meta = {
                    httpStatus: error.statusCode,
                };
                config.onRespondError(error, meta);
                errorMessage = action.failText || meta.message || 'Fail to fetch api';
                httpStatus = meta.httpStatus;
                businessCode = meta.businessCode;
            }
            else {
                errorMessage = 'Fail to request api';
                if (errMsg) {
                    if (/timeout/i.test(errMsg)) {
                        errorMessage = config.timeoutMessage ? config.timeoutMessage(errMsg) : errMsg;
                    }
                    else if (/fail/i.test(errMsg)) {
                        errorMessage = config.networkErrorMessage ? config.networkErrorMessage(errMsg) : errMsg;
                    }
                }
            }
            var errorResponse = tslib_1.__assign(tslib_1.__assign({}, action), { response: error.data, type: fail, loading: false, message: errorMessage, httpStatus: httpStatus,
                businessCode: businessCode, effect: action.onFail, after: action.afterFail, afterDuration: action.afterFailDuration });
            fail && core_1.storeHelper.dispatch(errorResponse);
            if (!isCancel) {
                _this.triggerShowError(errorResponse, action.hideError);
            }
            if (listener.canReject()) {
                return Promise.reject(errorResponse);
            }
            return;
        });
        var listener = new promise_listen_catch_1.default(promise);
        // @ts-ignore
        var fakePromise = listener;
        fakePromise.cancel = canceler || (function () { });
        return fakePromise;
    };
    return HttpService;
}(core_1.BaseHttpService));
exports.HttpService = HttpService;
