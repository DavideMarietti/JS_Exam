import CollectionItem from "./collection-item.js";


// Class representing users that don't own any CollectableItem, but that can take on loan CollectableItems of other users
export class User {

    // Static attributes and methods -> belongs to the class, not to the obj (can be implemented with the prototype too)
    //________________________________________________________________________________________________________________//

    static _count = 0;
    static _listUsers = {}; // List of all the Users objs (static -> centralized at the class level)

    static setId() {
        const id = this._count;
        this._count++;

        return id;
    }

    // Given an id as input, it returns the corresponding Collectable obj.
    static getUser(id) {
        return this._listUsers[id];
    }

    // Returns an array containing all the Collectable objs.
    static getAllUsers() {
        return this._listUsers;
    }


    //Constructor
    //________________________________________________________________________________________________________________//

    constructor(name, surname) {
        this._name = name;
        this._surname = surname;
        this._identifier = User.setId();
        this._collection = []; // Array of CollectionItem objs

        // Once a new User obj is created, it is added to the list of all the Users objs
        User._listUsers[this.identifier] = this;
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

    get surname() {
        return this._surname;
    }

    set surname(s) {
        this._surname = s;
    }


    // Calculated and Read-only attributes
    //________________________________________________________________________________________________________________//

    get currentCollection() {
        return this._collection.filter((item) => (item.holder === this));
    }
}


// A Collector obj represents a person that own a Collection
export class Collector extends User {

    constructor(name, surname) {
        super(name, surname)
    }


    // Calculated and Read-only attributes
    //________________________________________________________________________________________________________________//

    // Return an array containing only the items OWNED by the collector
    get ownCollection() {
        return this._collection.filter((item) => (item.owner === this));
    }

    // Return an array containing only the items that are currently received on LOAN
    get onLoanCollection() {
        return this._collection.filter((item) => (item.owner !== this && item.holder === this));
    }

    // Return the collector's items that are currently onLoan to other users
    get onLoanItems() {
        return this._collection.filter((item) => (item.holder !== item.owner));
    }

    // Return only the collector's items that are available for a loan
    get availableItems() {
        return this._collection.filter((item) => (!item.onLoan && item.available === true));
    }

    // Return only the collector's items that are not available for a loan
    get privateItems() {
        return this._collection.filter((item) => (item.owner === this && item.available === false));
    }


    // Methods
    //________________________________________________________________________________________________________________//

    // Given a Collectable, it creates a correspondent CollectionItem and adds it to the Collector's own collection
    // Note: currently, a Collectable obj can be set private only during the creation and if set available cannot be turned privat
    collect(collectable, available = true) {
        const item = new CollectionItem(collectable, this, available); // Encapsulation inside a CollectionItem obj
        this._collection.push(item);
    }

    // Give a Collectable, if present in the collection and owned by the collector it is removed
    remove(collectable) {
        const indexRemoved = this._collection.findIndex((item) => (item.collectable.identifier === collectable.identifier && item.owner === this))

        if (indexRemoved !== undefined) {
            // If the CollectableItem is on loan, it must be taken back first
            if (collectable.onLoan) {
                this.takeBack(collectable);
            }

            this._collection.splice(indexRemoved, 1);
        }
    }

    // Given a Collectable, if present and available, it is loan to a given Collector -> added to the Collector's collection
    // Note: during the loan, the CollectionItem is present in two collections (the holder's one and the owner's one)
    loan(collectable, collector) {
        // Closure
        const criteria = (item) => (item.collectable === collectable && item.available && !item.onLoan)

        const itemFound = this._collection.find(criteria);

        if (itemFound !== undefined) {
            itemFound.holder = collector; // Loan the CollectableItem to a collector
            collector._collection.push(itemFound); // Add the CollectableItem to the collector's collection
        }
    }


    // Given a Collectable, if present and on loan it is given back to the owner and removed from the collection of the holder
    takeBack(collectable) {
        // Check who is the owner and if the Collectable is on loan
        const item = this._collection.find((item) => (item.collectable === collectable && item.owner === this && item.onLoan));

        if (item !== undefined) {
            // Remove the Collectable from the collection of the holder
            const holder = item.holder;
            const pos = holder._collection.indexOf(item);
            if (pos >= 0) holder._collection.splice(pos, 1);

            // The holder is again the item's owner
            item.holder = this;
        }
    }
}