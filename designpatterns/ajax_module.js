define(function () {
    var createRequest = function () {
        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            return new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            return new ActiveXObject("Microsoft.XMLHTTP");
        }
    }

    var sendAJAX = function (url, method, callback) {
        var req = createRequest();
        req.onreadystatechange = function () {
            if (req.readyState == 4) {
                if (req.status == 200 || req.status == 304) {
                    callback(req);
                } else {
                    //The HTTP Status code isn't what we wanted; throw an error.
                    throw new Error("XMLHttpRequest failed. " +
                        "HTTP Status: " + req.status
                    );
                }
            }
        };
        req.open(method, url, true);
        req.send(null);
    }

    return {
        sendAJAX: sendAJAX
    }
});
