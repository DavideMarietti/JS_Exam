// A CollectionItem represents a generic item of a Collection. It is characterized by the correspondent Collectable obj
// and specific information about the loan status.

export default class CollectionItem {

    constructor(collectable, owner, available = true) {
        this._collectable = collectable; // The Collectable obj
        this._available = available; // Boolean variable. True if the item is available for a loan
        this._owner = owner; // The owner of the item
        this._holder = null; // The recipient of the loan. Once created, an item is not on loan to anyone
    }

    // Read-only private attributes
    //________________________________________________________________________________________________________________//

    get collectable() {
        return this._collectable;
    }

    get owner() {
        return this._owner;
    }

    get available() {
        return this._available;
    }

    // Calculated, read-only, private attributes
    //________________________________________________________________________________________________________________//

    get onLoan() {
        return (this._holder !== null);
    }

    // Access-controlled private attributes
    //________________________________________________________________________________________________________________//

    // This definition of the holder attribute incorporates the (previous) currentHolder() methods
    get holder() {
        return (this._holder === null ? this.owner : this._holder);
    }

    // This definition of the holder attribute incorporates the (previous) takeBack() and Loan() methods
    set holder(collector) {
        if (collector === this.owner) { // Give back the item to the owner -> always fine
            this._holder = null;
        } else {
            if (this._holder === null && this.available) { // Loan the item to a user -> allowed only if the item is currently not on load
                this._holder = collector;
            }
        }
    }
}