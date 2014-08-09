require(['ajax_module'], function (am) {
    am.sendAJAX('data.json', 'GET', function (req) {
        console.log(req.getAllResponseHeaders());
        var a = JSON.parse(req.responseText);
        console.log(a);
    });
});
