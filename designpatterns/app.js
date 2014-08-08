var executing = "mixin2";

/*
 *  Object create
 */
(function (isExecuting) {
    'use strict';
    if (!isExecuting) return;

    var johnDoe = {
        firstName: "John",
        lastName: "Doe",
        sayName: function () {
            return this.firstName + " " + this.lastName;
        }
    };
    var janeDoe = Object.create(johnDoe, {
        firstName: {
            value: "Jane"
        },
        greet: {
            value: function (person) {
                return "Hello, " + person.firstName;
            }
        }
    });
    var jimSmith = Object.create(janeDoe, {
        firstName: {
            value: "Jim"
        },
        lastName: {
            value: "Smith"
        }
    });
    console.log(johnDoe.sayName());
    console.log(janeDoe.sayName() + " " + janeDoe.greet(johnDoe));
    console.log(jimSmith.sayName() + " " + jimSmith.greet(janeDoe));

})(executing === 'object create');

/*
 *  Inheritance Pattern
 */
(function (isExecuting) {
    'use strict';
    if (!isExecuting) return;

    function Beverage(name, temperature) {
        this.name = name;
        this.temperature = temperature;
    }
    Beverage.prototype.drink = function () {
        console.log("I am drinking " + this.name);
    }

    function Coffee(type) {
        Beverage.call(this, "coffee", "hot");
        this.type = type;
    }
    Coffee.prototype = Object.create(Beverage.prototype);
    Coffee.prototype.sip = function () {
        console.log("I am sipping " + this.type + " " + this.name);
    }
    var water = new Beverage("water", "cold");
    var coffee = new Coffee("bold");
    console.log(water.drink());
    console.log(coffee.sip());
})(executing === 'inheritance');

/*
 *  Mixin
 */
(function (isExecuting) {
    'use strict';
    if (!isExecuting) return;

    function extend(target) {
        if (!arguments[1])
            return;
        for (var ii = 1, ll = arguments.length; ii < ll; ii++) {
            var source = arguments[ii];
            for (var prop in source) {
                if (!target[prop] && source.hasOwnProperty(prop)) {
                    target[prop] = source[prop];
                }
            }
        }
    }

    function Person(name) {
        this.name = name;
    }

    var speaker = {
        speak: function () {
            return this.name + " is speaking.";
        }
    };
    var mover = {
        move: function () {
            return this.name + " is moving.";
        }
    }
    extend(Person.prototype, speaker, mover);

    var john = new Person("John");
    console.log(john.speak());
    console.log(john.move());
})(executing === 'mixin');

/*
 *  Mixin 2
 */
(function (isExecuting) {
    'use strict';
    if (!isExecuting) return;

    function mixin(target, source, methods) {
        for (var ii = 2, ll = arguments.length; ii < ll; ii++) {
            var method = arguments[ii];
            target[method] = source[method].bind(source);
        }
    }

})(executing === 'mixin2');

/*
 *  Decorator
 */
(function (isExecuting) {
    'use strict';
    if (!isExecuting) return;

    function Beverage() {
        this._cost = 0;
    }
    Beverage.prototype.cost = function () {
        return this._cost;
    }

    function BeverageDecorator(beverage) {
        Beverage.call(this);
        this.beverage = beverage;
    }
    BeverageDecorator.prototype = Object.create(Beverage.prototype);
    BeverageDecorator.prototype.cost = function () {
        return this._cost + this.beverage.cost();
    }

    function Small(beverage) {
        BeverageDecorator.call(this, beverage);
        this._cost = -1;
    }
    Small.prototype = Object.create(BeverageDecorator.prototype);

    function Coffee() {
        Beverage.call(this);
        this._cost = 5;
    }
    Coffee.prototype = Object.create(Beverage.prototype);

    var coffee = new Coffee();
    coffee = new Small(coffee);
    console.log(coffee.cost());
})(executing === 'decorator');


