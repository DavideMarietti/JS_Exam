// Application that allows users and collectors to loan collectable objs.
// Note: exchanged objs are unique: if X takes on loan Y, no one can take on loan Y until it is given back to X.

// This test file is useful to check the initial implementation of the class diagrams

import {Collectable} from "./collectable.mjs";
import {User, Collector} from "./user.mjs";

const collector1 = new Collector("Ada", "Lovelace");
const collector2 = new Collector("Alan", "Turing");
const user1 = new User("Max", "Plack");

const item1 = new Collectable("Marchingegno", "Macchina di Turing completa di nastro");
const item2 = new Collectable("Motore Analitico", "Il primo computer della storia, se solo fosse esistito");
const item3 = new Collectable("Biro", "Una comune penna a sfera");
const item4 = new Collectable("Lettera 22", "Una macchina da scrivere, per chi ancora ricorda cosa siano");
const item5 = new Collectable("33 giri", "Un disco, stanno tornando di moda");
const item6 = new Collectable("Pellicola fotografica", "Ebbene sì, c'è ancora chi fa fotografie analogiche");

collector1.collect(item1);
collector1.collect(item2);
collector2.collect(item3);
collector2.collect(item4);
collector2.collect(item5);
collector2.collect(item6, false);

// Get info about an item give its id
//console.log(Collectable.getCollectable(2));
//console.log(Collectable.getAllCollectables());

console.log("//__________________________Initial Collections__________________________//");
//console.dir(collector1, {depth: 3});

/*
console.log('collector1: ', collector1.currentCollection)
console.log('collector2: ', collector2.currentCollection)
console.log('user1: ', user1.currentCollection)
*/

collector1.loan(item1, collector2);
collector1.loan(item2, collector2);
collector2.loan(item3, collector1);
collector2.loan(item4, user1);

collector2.remove(item5);

console.log("//_____________________________After the loan_____________________________//");
/*
console.log('collector1: ', collector1.currentCollection);
console.log('collector2: ', collector2.currentCollection);
console.log('user1: ', user1.currentCollection);
*/

collector1.takeBack(item2);
collector2.takeBack(item3);
collector2.takeBack(item4);


console.log("//_______________________After items are given back_______________________//");

/*
console.log('collector1: ', collector1.currentCollection);
console.log('collector2: ', collector2.currentCollection);
console.log('user1: ', user1.currentCollection);
*/

/*
console.log('collector1: ', collector1);
console.log('collector2: ', collector2);
console.log('user1: ', user1);
*/

/*
console.log('collector1 own collection (marchingegno, motore analitico): ', collector1.ownCollection);
console.log('collector2 received on load items (marchingegno): ', collector2.onLoanCollection);
console.log('collector1 onLoan items (marchingegno): ', collector1.onLoanItems);
console.log('collector2 available items (biro, lettera 33): ', collector2.availableItems);
console.log('collector2 private items(pellicola fotografica): ', collector2.privateItems);
*/

// Get info about a User give its id
console.dir(User.getUser(1), {depth: 3});
console.dir(User.getAllUsers(), {depth: 3});