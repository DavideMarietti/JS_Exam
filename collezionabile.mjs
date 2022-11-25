export class Collezionabile {

    //Identificatore univoco per la classe collezionabile
    static count = 0;
    static elencoCollezionabili = {};

    static assegnaId() {
        const id = this.count;
        this.count++;
        return id;
    }

    // Metodo che restituisce l'oggetto collezionabile corrispondente all'id dato in input
    static ottieniOggetto(id){
        return this.elencoCollezionabili[id];
    }

    constructor(nome, descrizione) {
        this.nome = nome;
        this.descrizione = descrizione;
        this.identificatore = Collezionabile.assegnaId();

        Collezionabile.elencoCollezionabili[this.identificatore] = this;
    }
}

export class Pianta extends Collezionabile {

    constructor(nome, descrizione, specie) {

        super(nome, descrizione)
        this.specie = specie;
    }

}