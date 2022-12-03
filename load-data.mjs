// Gli oggetti ci servono per avere dei metodi, avessi bisogno solo dei dati non servirebbe. Una volta ottenuto un json
// dal server devo ricostruirlo assegnandoci i metodi propri di quell'oggetto.

export async function createApp() {
    const app = {
        utenti: {},
        piante: {}
    }

    await initPlants(app);
    await initUsers(app);
    await simulaPrestiti()
    return app; // restituisco una promise di app
}


async function initPlants(app) {

}


async function initUsers(app) {
    try {
        const res = await fetch("./users.json");
        const users = await JSON.parse(res);

        for (let u of users) {
            if (u.collector) {
                app.utenti[u.nomeUtente] = new Collector(u.nomeUtente, u.cognomeUtente);
                for (let p of u.pianteUtente) {
                    app.utenti[u.nomeUtente].collect(p);
                }
            } else {
                app.utenti[u.nomeUtente] = new User(u.nomeUtente, u.cognomeUtente);
            }
        }
    } catch (err) {
        //To handle errors
    }
}