import CollectionItem from "./collection-item.mjs";


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

    // Return an array containing ALL the items currently collected by the collector (owned and received on loan)
    get currentCollection() {
        return this._collection;
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
        let ownCollection = [];
        for (let item of this._collection) {
            if (item.owner === this) { // check if the CollectionItem is owned by the collector
                ownCollection.push(item);
            }
        }

        return ownCollection;
    }

    // Return an array containing only the items that are currently received on LOAN
    get onLoanCollection() {
        let onLoanCollection = [];
        for (let item of this._collection) {
            if (item.owner !== this && item.holder === this) { // check if the CollectionItem is given on loan
                onLoanCollection.push(item);
            }
        }

        return onLoanCollection;
    }

    // Return the collector's items that are currently onLoan to other users
    get onLoanItems() {
        let onLoanItems = [];
        for (let item of this._collection) {
            if (item.owner === this && item.holder !== item.owner) { // check if the CollectionItem is available for a loan
                onLoanItems.push(item);
            }
        }

        return onLoanItems;
    }

    // Return only the collector's items that are available for a loan
    get availableItems() {
        let availableItems = [];
        for (let item of this._collection) {
            // check if the CollectionItem is available for a loan
            if (item.owner === this && item.holder === this && item.available === true) {
                availableItems.push(item);
            }
        }

        return availableItems;
    }

    // Return only the collector's items that are not available for a loan
    get privateItems() {
        let privateItems = [];
        for (let item of this._collection) {
            if (item.owner === this && item.available === false) { // check if the CollectionItem is available for a loan
                privateItems.push(item);
            }
        }

        return privateItems;
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
        let pos = -1;
        for (let i = 0; i < this._collection.length && pos < 0; i++) {
            if (this._collection[i].collectable.identifier === collectable.identifier && this._collection[i].collectable.owner == this) {

                // If the CollectableItem is on loan, it must be taken back first
                if (collectable.onLoan) {
                    this.takeBack(collectable);
                }

                pos = i;
            }
        }
        if (pos >= 0) this._collection.splice(pos, 1);
    }

    // Given a Collectable, if present and available, it is loan to a given Collector -> added to the Collector's collection
    // Note: during the loan, the CollectionItem is present in two collections (the holder's one and the owner's one)
    loan(collectable, collector) {
        for (let item of this._collection) {
            if (item.collectable === collectable && item.available && !item.onLoan) {

                item.holder = collector; // Loan the CollectableItem to a collector
                collector._collection.push(item); // Add the CollectableItem to the collector's collection

                break;
            }
        }
    }

    // Given a Collectable, if present and on loan it is given back to the owner and removed from the collection of the holder
    takeBack(collectable) {
        for (let item of this._collection) {
            // check who is the owner and if the Collectable is on loan
            if (item.collectable === collectable && item.owner === this && item.onLoan) {

                // Remove the Collectable from the collection of the holder
                const holder = item.holder;
                const pos = holder._collection.indexOf(item);
                if (pos >= 0) holder._collection.splice(pos, 1);

                // The holder is again the item's owner
                item.holder = this;

                break;
            }
        }
    }
}