'use strict';
var util = require('util');

class EBase {
    constructor(options){
        this.properties = {};
        this.attributes = {};
        this.name = options.name;
    }
}

class E extends EBase {
    constructor(options) {
        super(options)
    }
}

function derive(Super, name, constructor, options){

    class X extends Super {
        constructor(options){
            super(options);
            constructor.call(this, options);
        }
    }

    //return NewClass;
    return X;
}

//dynamically create class via derivation
var Car = derive(E, 'car', function(options){
    this.wheels = 4;
    this.doors = 2;
});

//add normal method
Car.prototype.run = function(howFast){
    console.log(`running @${howFast} miles an hour on ${this.wheels} wheels`)
}
//add static method
Car.brake = function(){
    console.log('STOP!');
}

var Bike = derive(E, 'car', function(options){
    this.handlebars = 2;
    this.seats = 1;
});

Bike.prototype.peddle = function(){
    console.log('peddling a long...');
}

Bike.prototype.classification = 'small machine';

function instantiate(MyClass){
    return new MyClass
}

var myCar = new Car({name: 'Monster Car'});
var myBike = new Bike({name: 'Mountain animal'});


myCar.properties.color = 'red';
myBike.properties.color = 'blue';
//console.log('E class: ', E);
//console.log('Car class: ', Car);
//console.log('Bike class: ', Bike);
console.log('My Car: ', myCar);
console.log('My Car Prototype: ', myCar.__proto__);
console.log('My Bike: ', myBike);
console.log('My Bike Prototype: ', myBike.__proto__);
myCar.run(69);
Car.brake();


