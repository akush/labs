define(function () {
    function randomString(length, chars) {
        if (!length) length = 1;
        var mask = '';
        if (chars.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz';
        if (chars.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (chars.indexOf('#') > -1) mask += '0123456789';
        if (chars.indexOf('!') > -1) mask += '~`!@#$%^&*()_+-={}[]:;<>?,./|';
        var result = '';
        for (var i = length; i > 0; --i) result += mask[Math.round(Math.random() * (mask.length - 1))];
        return result;
    }
    return {
        number: function (digits) {
            return randomString(digits, '#');
        },
        alpha: function (length) {
            return randomString(length, 'aA');
        },
        alphanum: function (length) {
            return randomString(length, '#aA');
        },
        allkeys: function (length) {
            return randomString(length, '#!aA');
        }
    }
});
