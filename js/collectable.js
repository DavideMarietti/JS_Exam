// JS CLASS:
// CONSTRUCTOR -> it defines and initializes the attributes of the class's objs (each obj has its own attributes' value)
// PROTOTYPE -> each method is assigned to the prototype of the class's objs (a method is the same for each obj)

// A Collectable obj represents an obj that can be included in a Collection of a given User.

export class Collectable {

    // Static attributes and methods
    //________________________________________________________________________________________________________________//

    static _count = 0;
    static _listCollectables = {}; // List of all the Collectable objs (static -> centralized at the class level)

    //Set a unique id for each obj of the Collectable class
    static setId() {
        const id = this._count;
        this._count++;

        return id;
    }

    // Given an id as input, it returns the corresponding Collectable obj.
    static getCollectable(id) {
        return this._listCollectables[id];
    }

    // Returns an array containing all the Collectable objs.
    static getAllCollectables() {
        return this._listCollectables;
    }


    // Constructor
    //________________________________________________________________________________________________________________//

    constructor(name, description) {
        this._name = name;
        this._description = description;
        this._identifier = Collectable.setId();

        // Once a new Collectable obj is created, it is added to the list of all the Collectable objs
        Collectable._listCollectables[this.identifier] = this;
    }


    // Read-only private attributes
    //________________________________________________________________________________________________________________//

    get identifier() {
        return this._identifier;
    }


    // Private attributes
    //________________________________________________________________________________________________________________//

    get name() {
        return this._name;
    }

    set name(n) {
        this._name = n;
    }

    get description() {
        return this._description;
    }

    set description(d) {
        this._description = d;
    }
}


// In js, the inheritance is between objs instead of between classes.
// In order to create blueprints of objs, where the properties are copy of the themself, we use constructors.


// todo: proper extension of this sub-class
// Subclass extending and specializing the Collectable class
export class Plant extends Collectable {

    constructor(name, description, img, origin, group, meaning, season, bloom, handle, rarity, sun, water) {

        super(name, description)

        this.img = img;
        this.group = group;
        this.meaning = meaning; // meaning of the plant in some country (e.g. Japan, Italy, ...)
        this.origin = origin; // geographical origin
        this.season = season; // best season to host the plant (e.g. when it blooms/produce fruits)
        this.bloom = bloom; // bool -> does it produces flowers
        this.handle = handle; // categorical -> how much is it hard to handle
        this.rarity = rarity; // categorical -> how much rare it is (from 1 to 10)
        this.sun = sun; // categorical -> how much sun it needs
        this.wather = water; // categorical -> how much water it needs
    }
}