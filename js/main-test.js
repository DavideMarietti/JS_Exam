// Application that allows users and collectors to loan collectable objs.
// Note: exchanged objs are unique: if X takes on loan Y, no one can take on loan Y until it is given back to X.

// This TEST file is useful to check the initial implementation of the class diagrams

import {Collectable} from "./collectable.js";
import {User, Collector} from "./user.js";

const Ada = new Collector("Ada", "Lovelace");
const Alan = new Collector("Alan", "Turing");
const Max = new User("Max", "Plack");

const item1 = new Collectable("Marchingegno", "Macchina di Turing completa di nastro");
const item2 = new Collectable("Motore Analitico", "Il primo computer della storia, se solo fosse esistito");
const item3 = new Collectable("Biro", "Una comune penna a sfera");
const item4 = new Collectable("Lettera 22", "Una macchina da scrivere, per chi ancora ricorda cosa siano");
const item5 = new Collectable("33 giri", "Un disco, stanno tornando di moda");
const item6 = new Collectable("Pellicola fotografica", "Ebbene sì, c'è ancora chi fa fotografie analogiche");

Ada.collect(item1);
Ada.collect(item2);
Alan.collect(item3);
Alan.collect(item4);
Alan.collect(item5);
Alan.collect(item6, false);

// Get info about an item give its id
//console.log(Collectable.getCollectable(2));
//console.log(Collectable.getAllCollectables());

console.log("//________________________________Initial Collections_________________________________//");
//console.dir(Ada, {depth: 3});

/*
console.log('Ada: ', Ada.currentCollection)
console.log('Alan: ', Alan.currentCollection)
console.log('Max: ', Max.currentCollection)
*/

Ada.loan(item1, Alan);
Ada.loan(item2, Alan);
Alan.loan(item3, Ada);
Alan.loan(item4, Max);

Alan.remove(item5);

console.log("//___________________________________After the loan___________________________________//");

/*
console.log('Ada: ', Ada.currentCollection);
console.log('Alan: ', Alan.currentCollection);
console.log('Max: ', Max.currentCollection);
*/


Ada.takeBack(item2);
Alan.takeBack(item3);
Alan.takeBack(item4);


console.log("//_____________________________After items are given back_____________________________//");

/*
console.log('Ada: ', Ada.currentCollection);
console.log('Alan: ', Alan.currentCollection);
console.log('Max: ', Max.currentCollection);
*/

/*
console.log('Ada: ', Ada);
console.log('Alan: ', Alan);
console.log('Max: ', Max);
*/


/*
console.log('Ada current collection (Motore Analitico): ', Ada.currentCollection);
console.log('Alan current collection (Marchingenio, Biro, Lettera 22, Pellicola Fotografica: ', Alan.currentCollection);
console.log('Ada own collection (marchingegno, motore analitico): ', Ada.ownCollection);
console.log('Alan received on load items (marchingegno): ', Alan.onLoanCollection);
console.log('Ada onLoan items (marchingegno): ', Ada.onLoanItems);
console.log('Alan available items (biro, lettera 22): ', Alan.availableItems);
console.log('Alan private items(pellicola fotografica): ', Alan.privateItems);
*/


// Get info about a User give its id
//console.dir(User.getUser(1), {depth: 3});
//console.dir(User.getAllUsers(), {depth: 3});