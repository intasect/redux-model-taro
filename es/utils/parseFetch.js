export var parseFetch = function (options, response) {
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
