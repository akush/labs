define(function () {
    var customHeaders = {};

    function addHeader(key, value) {
        customHeaders[key] = value;
    }

    function removeHeader(key) {
        delete customHeaders[key];
    }

    function request(method, url) {
        return new Promise(function (resolve, reject) {
            var req = new XMLHttpRequest();
            req.open(method, url);
            for (var key in customHeaders) {
                if (customHeaders.hasOwnProperty(key))
                    req.setRequestHeader(key, customHeaders[key]);
            }
            req.onload = function () {
                if (req.status == 200 || req.status == 304) {
                    resolve(req.response);
                } else {
                    reject(Error(req.statusText));
                }
            };
            req.onerror = function () {
                reject(Error("Network Error"));
            };
            req.send();
        });
    }

    function get(url) {
        return request('GET', url);
    }

    function post(url) {
        return request('POST', url);
    }

    function getJSON(url) {
        return get(url).then(JSON.parse);
    }

    function postJSON(url) {
        return post(url).then(JSON.parse);
    }

    function requestJSON(method, url) {
        return request(method, url).then(JSON.parse);
    }

    return {
        addHeader: addHeader,
        removeHeader: removeHeader,
        request: requestJSON,
        get: getJSON,
        post: postJSON
    }
});
