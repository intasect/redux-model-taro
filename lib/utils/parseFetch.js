"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseFetch = void 0;
exports.parseFetch = function (options, response) {
    if (options.responseType === 'arraybuffer') {
        return response.arrayBuffer();
    }
    if (options.dataType === 'json' || typeof options.dataType === 'undefined') {
        return response.json();
    }
    if (options.responseType === 'text') {
        return response.text();
    }
    return Promise.resolve(null);
};
