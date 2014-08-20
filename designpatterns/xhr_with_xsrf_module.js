define(['cookie_module', 'xhr_module'], function (cookie, XHR) {
    var xsrfToken = '';
    var xhr = XHR;
    return {
        setXsrfToken: function (token) {
            xsrfToken = token;
            xhr.addHeader(
                token,
                cookie.get(token)
            );
        },
        request: xhr.request,
        get: xhr.get,
        post: xhr.post
    }
});
