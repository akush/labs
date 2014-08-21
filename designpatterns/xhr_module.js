// xhr_module, v1.1
// Copyright (c)2014 Abhinav Kushwaha (akush).
// Distributed under MIT license

// For IE use:
// <script src="http://rsvpjs-builds.s3.amazonaws.com/rsvp-latest.min.js"></script>
// <script>var Promise = RSVP.Promise;</script>

define(function () {
    var customHeaders = {};

    function addHeader(key, value) {
        customHeaders[key] = value;
    }

    function removeHeader(key) {
        delete customHeaders[key];
    }

    function request(method, url, data) {
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

    function post(url, data) {
        return request('POST', url, data);
    }

    function getJSON(url) {
        return get(url).then(JSON.parse);
    }

    function postJSON(url, data) {
        return post(url, data).then(JSON.parse);
    }

    function requestJSON(method, url, data) {
        return request(method, url, data).then(JSON.parse);
    }

    return {
        addHeader: addHeader,
        removeHeader: removeHeader,
        request: requestJSON,
        get: getJSON,
        post: postJSON
    }
});
