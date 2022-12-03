// Gli oggetti ci servono per avere dei metodi, avessi bisogno solo dei dati non servirebbe. Una volta ottenuto un json
// dal server devo ricostruirlo assegnandoci i metodi propri di quell'oggetto.

import {Collector, User} from "./user";
import {Plant} from "./collectable";

export async function createApp() {
    const app = {
        users: {},
        plants: {}
    }

    await initPlants(app);
    await initUsers(app);
    await simulateLoan()

    return app; // returning a promise of the app obj
}


// Initialized plants
// Todo: move everything in a .json and define an init function as for the users
async function initPlants(app) {
    app.plants["eightdays"] = new Plant("Eight Days a Week", `Ooh, I need your love, babe
Guess you know it's true
Hope you need my love, babe
Just like I need you`, "The Beatles", "Beatles for Sale",
        "Lennon-McCartney", "Lennon-McCartney", 1964);
    app.plants["ship2wreck"] = new Plant("Ship to Wreck", `And, ah, my love remind me, what was it that I said?
I can't help but pull the earth around me to make my bed
And, ah, my love remind me, what was it that I did?
Did I drink too much? Am I losing touch?
Did I build a ship to wreck?`, "Florence and the Machine",
        "How Big, How Blue, How Beautiful", "Florence Welch, Tom Hull", "Florence Welch, Tom Hull", 2015);
    app.plants["thankU"] = new Plant("Thank U", `How 'bout no longer being masochistic?
How 'bout remembering your divinity?
How 'bout unabashedly bawling your eyes out?
How 'bout not equating death with stopping?`, "Alanis Morissette", "Supposed Former Infatuation Junkie",
        "Alanis Morissette, Glen Ballard", "Alanis Morissette, Glen Ballard", 1998);
    app.plants["cityofangels"] = new Plant("City of Angels", `Lost in the city of angels
Down in the comfort of strangers
I found myself in the far burned hills
In the land of a billion lights`, "Thirty Seconds to Mars",
        "Love, Lust, Faith and Dreams", "Jared Leto", "Jared Leto", 2013);
    app.plants["labyrinth"] = new Plant("Labyrinth", `I find my only salvation
In playing hide and seek in this labyrinth
And my sense of connection
Is lost like the sound of my steps`, "Elisa", "Pipes & Flowers",
        "Catherine Marie Warner, Elisa Toffoli", "Catherine Marie Warner, Elisa Toffoli", 1997);

    app.plants["cicale"] = new Plant("Cicale", `Di chi sta male
Cicale, cicale, cicale
Di chi fa il pianto
Cicale ma mica poi tanto`, "Heather Parisi", "Cicale/Mr.Pulce",
        "Alberto Testa, Tony De Vita, Silvio Testi, Franco Miseria e Antonio Ricci",
        "Alberto Testa, Tony De Vita, Silvio Testi, Franco Miseria e Antonio Ricci", 1981);

    app.plants["alghero"] = new Plant("Alghero", `Musica, è come musica
Il desiderio regna nella mente
E parto senza voglia di tornare
Musica, è come musica
La smania che mi prende di vestirmi da sirena
È come una visione magica`, "Giuni Russo", "Giuni", "Giuni Russo",
        "Maria Antonietta Sisini", 1986);

}


// Initialized users
async function initUsers(app) {
    try {
        const res = await fetch("../data/users.json"); // Fetch data from a simulated DB
        const users = await JSON.parse(res);

        for (let user of users) {
            // If the user is a collector
            if (user.collector) {
                //todo: choose an unique way to index document's elements
                app.users[user.name] = new Collector(user.name, user.surname);
                for (let plant of user.items) {
                    app.users[user.name].collect(plant); // assign items to the user's collection
                }
            } else {
                app.users[user.name] = new User(user.name, user.surname);
            }
        }
    } catch (err) {
        // Handle errors
    }
}


// Simulate a loans once the users have been initialized
function simulateLoan(app) {
    app.users["Alice"].loan(app.plants["eightdays"], app.user["Matteo"]);
    app.users["Alice"].loan(app.plants["ship2wreck"], app.user["Celia"]);

    app.users["Matteo"].loan(app.plants["cicale"], app.user["Celia"]);
    app.users["Matteo"].loan(app.plants["labyrinth"], app.user["Alice"]);
}