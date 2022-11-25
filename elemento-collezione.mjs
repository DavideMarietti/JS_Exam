export default class ElementoCollezione {
    constructor(collezionabile, proprietario, prestabile = true) {
        this._collezionabile = collezionabile;
        this._proprietario = proprietario;
        this._prestabile = prestabile;
        this._destinatario = null;
    }

    // Proprietà read-only
    get collezionabile() {
        return this._collezionabile;
    }

    get proprietario() {
        return this._proprietario;
    }

    get prestabile() {
        return this._prestabile;
    }

    // Proprietà calcolata e read-only
    get inPrestito() {
        return (this._destinatario !== null);
    }

    // Proprietà ad accesso controllato
    get possessore() {
        return (this._destinatario === null ? this._proprietario : this._destinatario);
    }

    set possessore(collezionista) {
        if (collezionista === this._proprietario) {
            this._destinatario = null; // è una restituzione ed è sempre ok
        } else {
            if (this._destinatario === null) {
                this._destinatario = collezionista; // è un prestito, si può fare solo se non è già prestato
            }
        }
    }


    // todo: presta e restituisci  potrebbero essere sostituite da un semplice accesso controllato alla proprietà possessore
    presta(collezionista) {
        if (this.prestabile && !this.inPrestito && collezionista !== this.proprietario) {
            this.destinatario = collezionista;
        }
    }

    restituisci() {
        if (this.inPrestito === true) {
            this.destinatario = null;
        }
    }
}