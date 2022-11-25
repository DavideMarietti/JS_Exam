// App che permetta a diversi utenti, collezionisti di una tipologia di "oggetto digitale",
// di prendere a prestito l'uno dall'altro gli oggetti che collezionano.

// Nota: gli oggetti scambiati sono UNICI: se X prende in prestito un Y, nessuno potrà usufruirne finché X non restituisce Y.

import {Collezionabile, Pianta} from "./collezionabile.mjs";
import {Partecipante, Collezionista} from "./collezionista.mjs";

const persona1 = new Collezionista("Ada", "Lovelace");
const persona2 = new Collezionista("Alan", "Turing");

const elem1 = new Collezionabile("Marchingegno", "Macchina di Turing completa di nastro");
const elem2 = new Collezionabile("Motore Analitico", "Il primo computer della storia, se solo fosse esistito");
const elem3 = new Collezionabile("Biro", "Una comune penna a sfera");
const elem4 = new Collezionabile("Lettera 22", "Una macchina da scrivere, per chi ancora ricorda cosa siano");
const elem5 = new Collezionabile("33 giri", "Un disco, stanno tornando di moda");
const elem6 = new Collezionabile("Pellicola fotografica", "Ebbene sì, c'è ancora chi fa fotografie analogiche");

persona1.colleziona(elem2);
persona1.colleziona(elem4);
persona1.colleziona(elem6);
persona2.colleziona(elem1);
persona2.colleziona(elem3);
persona2.colleziona(elem5);

// Ottieni informazioni su un obj dato il suo id
console.log(Collezionabile.ottieniOggetto(2));

console.log("collezioni iniziali");
console.dir(persona1, {depth: 3});
console.dir(persona2, {depth: 3});

persona1.presta(elem2, persona2);
persona2.presta(elem1, persona1);
persona2.presta(elem3, persona1);

console.log("dopo il prestito");
console.dir(persona1, {depth: 3});
console.dir(persona2, {depth: 3});

persona1.riprendi(elem2);
persona2.riprendi(elem3);
console.log("dopo la restituzione");
//DIR: a differenza di log permette di specificare il livello di espansione con cui voglio stampare l'obj
console.dir(persona1, {depth: 3});
console.dir(persona2, {depth: 3});
console.dir(Collezionabile, {depth: 3, showHidden: true});