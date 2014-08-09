define(["dom_module"], function (dom) {

    function createInput(type) {
        var el = dom.create("input");
        el.type = type;
        return el;
    }

    var controls = {
        text: function (options) {
            var el = createInput('text');
            if (typeof options.value !== 'undefined') {
                el.value = options.value;
            }
            return el;
        },
        checkbox: function (options) {
            var el = createInput('checkbox');
            if (typeof options.checked !== 'undefined') {
                el.checked = options.checked;
            }
            return el;
        }
    }
    return {
        create: function (options) {
            var type = options.type ? options.type.toLowerCase() : undefined;
            if (!type || !controls[type]) {
                throw new {
                    message: type + "is not supported"
                };
            }
            return controls[type](options);
        }
    }
});
