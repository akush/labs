define(function () {
    var _counter = 0;

    function generateId() {
        return "taskManagerId" + _counter++;
    }

    function create(tagName, id) {
        var el = document.createElement(tagName);
        el.id = id || this.generateId();
        return el;
    }

    function createList(title) {
        var el = this.create("div");
        var title = title || '';
        el.className = "col-lg-5 list well well-sm";
        el.innerHTML =
            '<a href="#" class="btn btn-sm btn-danger pull-right" title="delete list"><span class="glyphicon glyphicon-trash"></span></a>\
            <a href="#" class="btn btn-sm btn-primary pull-right" title="add task"><span class="glyphicon glyphicon-plus"></span></a>\
            <div class="title"><input type="text" value="'+title+'" autofocus placeholder="List title"></div>' ;
        return el;

    }

    function createTask(title, desc) {
        var el = this.create("div");
        var title = title || '';
        var desc = desc || '';
        el.innerHTML = '<div class="item row">\
                            <div class="col-lg-1">\
                                <input type="checkbox">\
                                <br style="clear:both">\
                                <br style="clear:both">\
                                <a href="#"><span class="glyphicon glyphicon-trash"></span></a>\
                            </div>\
                            <div class="item-values col-lg-10">\
                                <div class="item-title">\
                                        <input type="text" value="'+title+'">\
                                    </div>\
                                    <div class="item-desc">\
                                        <textarea>'+desc+'</textarea>\
                                    </div>\
                                </div>\
                        </div>';
        return el;
    }

    return {
        generateId: generateId,
        create: create,
        createList: createList,
        createTask: createTask
    }
});
