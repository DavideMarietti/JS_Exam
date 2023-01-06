// Gli oggetti ci servono per avere dei metodi, avessi bisogno solo dei dati non servirebbe. Una volta ottenuto un json
// dal server devo ricostruirlo assegnandoci i metodi propri di quell'oggetto.

import {Collector, User} from "./user.js";
import {Plant} from "./collectable.js";


export async function createApp() {
    const app = {
        users: {},
        plants: {}
    }

    await initPlants(app);
    await initUsers(app);
    simulateLoan(app); // todo: put it in a then to treat async properly

    return app; // returning a promise of the app obj
}


// Initialized plants data
async function initPlants(app) {

    const res = await fetch("../data/plants.json"); // Fetch data from a simulated DB
    const plants = await res.json(); // equivalent to JSON.parse()

    try {
        for (let plant of plants) {
            app.plants[plant.name] = new Plant(plant.name, plant.description, plant.img, plant.origin, plant.group,
                plant.meaning, plant.climate, plant.bloom, plant.handle, plant.rarity, plant.sun, plant.water,
                plant.discovery);
        }
    } catch (err) {
        // Todo: handle errors
    }
}


// Initialized users data
async function initUsers(app) {
    try {

        const res = await fetch("../data/users.json"); // Fetch data from a simulated DB
        const users = await res.json();

        for (let user of users) {
            // If the user is a collector..., else...
            if (user.collector) {
                app.users[user.name] = new Collector(user.name, user.surname, user.age, user.sentence, user.img, user.job);
                for (let plant of user.items) {
                    app.users[user.name].collect(app.plants[plant]); // assign items to the user's collection
                }
            } else {
                app.users[user.name] = new User(user.name, user.surname, user.age, user.sentence, user.img, user.job);
            }
        }
    } catch (err) {
        // Todo: handle errors
    }
}


// Simulate a loans once users and plants have been initialized
function simulateLoan(app) {
    app.users["Alice"].loan(app.plants["Caper"], app.users["Matteo"]);
    //app.users["Alice"].loan(app.plants["Rafflesiaceae"], app.users["Celia"]);

    app.users["Matteo"].loan(app.plants["Drosera capensis"], app.users["Alice"]);
    //app.users["Matteo"].loan(app.plants["Venus Flytrap"], app.users["Alice"]);
}