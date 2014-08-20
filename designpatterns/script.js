require(['cookie_module', 'xhr_with_xsrf_module', 'random_module'], function (cookie, xhr, rand) {
    cookie.create('x-xsrf-token', 'asdasd');
    xhr.setXsrfToken('x-xsrf-token');
    xhr.get('data.json?_=' + rand.number(5)).then(function (data) {
        console.log(data);
    });
});
