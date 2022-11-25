import ElementoCollezione from "./elemento-collezione.mjs";


export class Partecipante {

    //Identificatore univoco per la classe collezionista
    static _count = 0;

    get count() {
        return this._count;
    }

    static assegnaId() {
        const id = this._count;
        this._count++;
        return id;
    }

    constructor(nome, cognome) {
        this.nome = nome;
        this.cognome = cognome;
        this._identificatore = Collezionista.assegnaId(); // prop read-only
        this.collezione = [];
        this._collezioneAttuale = this.collezione;
    }

    get identificatore() {
        return this._identificatore;
    }
/*
    collezioneAttuale restituisce un array contenente tutti gli elementi in possesso del
    collezionista, suoi o ricevuti in prestito da altri
- collezioneInPrestito restituisce solo gli elementi che il collezionista ha in prestito
- disponibili restituisce solo gli elementi del collezionista disponibili al prestito
- prestati restituisce solo gli elementi di proprietà del collezionista attualmente in prestito
*/

    // Incapsulo nell'oggeto elemento collezione
    colleziona(collezionabile) {
        const elem = new ElementoCollezione(collezionabile, this);
        this.collezione.push(elem);
    }

    rimuovi(collezionabile) {
        let pos = -1;
        for (let i = 0; i < this.collezione.length && pos < 0; i++) {
            if (elem.collezionabile === collezionabile) {
                pos = i;
            }
        }
        if (pos >= 0) this.collezione.splice(pos, 1);
    }

    presta(collezionabile, collezionista) {
        for (let elem of this.collezione) {
            if (elem.collezionabile === collezionabile && elem.prestabile && !elem.inPrestito) {
                // verifica che l'elemento sia prestabile e NON sia già in prestito
                // quindi lo cede a colui che lo vuole in prestito
                elem.presta(collezionista);

                // lo inserisce effettivamente nella collezione del destinarario del prestito
                collezionista.collezione.push(elem);
                break;
            }
        }
    }

    riprendi(collezionabile) {
        for (let elem of this.collezione) {
            if (elem.collezionabile === collezionabile && elem.inPrestito) { // verifica che l'elemento sia in prestito
                // toglie l'elemento corrispondente dalla collezione del destinatario del prestito
                const aChiLhoPrestato = elem.attualePossessore();
                const pos = aChiLhoPrestato.collezione.indexOf(elem);
                if (pos >= 0) aChiLhoPrestato.collezione.splice(pos, 1);

                // il proprietario diventa anche il possessore
                elem.restituisci();
                break;
            }
        }
    }

    get collezioneAttuale() {
        return this.collezioneAttuale;
    }

    //proprietà read-only
    get collezioneInPrestito() {
    }

    get disponibili() {
    }

    get prestati() {
    }

}



export class Collezionista extends Partecipante{

    constructor(nome, cognome) {
        super(nome, cognome)
    }

    /*
    collezioneAttuale restituisce un array contenente tutti gli elementi in possesso del
    collezionista, suoi o ricevuti in prestito da altri
- collezionePropria restituisce solo gli elementi di proprietà del collezionista
- privati restituisce solo gli elementi di proprietà del collezionista che non sono prestabili
*/

    //proprietà read-only
    get collezionePropria() {

    }

    get privati() {
    }

}