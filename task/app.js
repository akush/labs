require(['dom_module'], function (dom) {
    var addListBtn = document.getElementById('addlist');
    var row = document.getElementById('container');

    var List = function (title) {
        var that = this;
        this.children = [];
        this.element = dom.createList(title);
        this.addBtn = this.element.getElementsByClassName('btn-primary')[0];
        this.addBtn.onclick = function () {
            that.add(new Task(that));
        }
        this.deleteBtn = this.element.getElementsByClassName('btn-danger')[0];
        this.deleteBtn.onclick = function () {
            that.hide(that.element);
        }
    }
    List.prototype = {
        add: function (child) {
            this.children.push(child);
            this.element.appendChild(child.getElement());
        },
        hide: function (el) {
            el.style.display = "none";
        },
        getElement: function () {
            return this.element;
        }
    }

    var Task = function (list, title, desc) {
        var that = this;
        this.list = list;
        this.element = dom.createTask(title, desc);
        this.toggleBtn = this.element.getElementsByTagName('input')[0];
        this.toggleBtn.onclick = function () {
            that.toggleDone(that.element);
        }
        this.deleteBtn = this.element.getElementsByTagName('a')[0];
        this.deleteBtn.onclick = function () {
            that.hide(that.element);
        }
    }

    Task.prototype = {
        hide: function (el) {
            el.style.display = "none";
        },
        toggleDone: function (el) {
            var list = el.classList;
            if (list.contains("done"))
                list.remove("done");
            else
                list.add("done");
            el.className = list.toString();
        },
        getElement: function () {
            return this.element;
        }
    }

    addListBtn.onclick = function () {
        var list = new List();
        row.appendChild(list.getElement());
    }

    var pending = new List("Pending");
    pending.add(new Task(pending, "Bug 09234", "IE styling error"));
    pending.add(new Task(pending, "Bug 09524", "parse not working properly"));
    row.appendChild(pending.getElement());

    var onhold = new List("On hold");
    onhold.add(new Task(onhold, "Bug 09232", "logging error"));
    row.appendChild(onhold.getElement());

    var working = new List("Working");
    row.appendChild(working.getElement());

});
