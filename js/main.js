// Once downloaded all data, the application is initialized using the createApp() function

import {createApp} from "./load-data.js";

createApp()
    .then((app) => {
        
        const container = document.querySelector(".user-logins");
        let selectedUser = Object.values(app.users)[0];
        
        for (let u of Object.values(app.users)) {
            let pulsanteTemplate = "";
            if (u === selectedUser) {
                pulsanteTemplate = `<p utente="${u.nome}" class="selected">${u.nome}</p>`
            } else {
                pulsanteTemplate = `<p utente="${u.nome}">${u.nome}</p>`
            }
            container.insertAdjacentHTML("beforeend", pulsanteTemplate);
        }


        const buttons = document.querySelectorAll(".user-logins > p");
        
        for (const p of buttons) {
            p.addEventListener("click", (event) => {
                p.classList.add("selected");
                const nome = p.getAttribute("utente");
                selectedUser = app.users[nome];
                const tutti = p.parentElement.children;
                for (const child of tutti) {
                    if (child !== p) child.classList.remove("selected")
                }
                reset();
            });
        }


        function reset() {
            const titolo = document.querySelector(".collection-title");
            titolo.innerText = "Collezione di " + selectedUser.nome;
            const elenco = document.querySelector(".collection-content");
            elenco.innerHTML = "";

            for (let coll of selectedUser.collezioneAttuale) {
                let stato = "";
                if (!coll.prestabile) stato = "non disponibile";
                else if (coll.possessore === coll.proprietario) stato = "disponibile al prestito";
                else if (coll.proprietario === selectedUser) stato = "in prestito a " + coll.possessore.nome;
                else stato = "ricevuto in prestito da " + coll.proprietario.nome;
                const template = `<li><strong>${coll.collezionabile.nome}</strong>, ${stato}</li>`;
                elenco.insertAdjacentHTML("beforeend", template);
            }

            const allitems = elenco.querySelectorAll("li");
            for (let item of allitems) {
                item.addEventListener("mousedown", () => {
                    item.classList.toggle("evidenzia");
                });
            }
        }


        reset();
    });