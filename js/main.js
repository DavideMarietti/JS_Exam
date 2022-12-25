// Once downloaded all data, the application is initialized using the createApp() function

import {createApp} from "./load-data.js";

createApp()
    .then((app) => {

        //console.log(app)

        const userButtons = document.querySelector(".user-buttons");

        const allUsersName = Object.keys(app.users);
        const firstUser = allUsersName[0];
        let user = app.users[firstUser];

        const userButtonsText = allUsersName.map(name => (name === firstUser ?
            `<p user-name="${name}" class="nav__el nav__el--cta selected">${name}</p>`
            : `<p user-name="${name}" class="nav__el nav__el--cta">${name}</p>`));

        userButtons.innerHTML = userButtonsText.join("");

        const mainNavButtons = userButtons.querySelectorAll("p");

        for (const p of mainNavButtons) {
            p.addEventListener("click", (event) => {
                p.classList.add("selected");
                const name = p.getAttribute("user-name");
                user = app.users[name];
                const all = p.parentElement.children;
                for (const child of all) {
                    if (child !== p) child.classList.remove("selected")
                }
                reset();
            });
        }

        function reset() {
            const title = document.querySelector(".collection-title");
            title.innerText = "Collezione di " + user.name;
            const list = document.querySelector(".collection-content");
            list.innerHTML = "";

            for (let coll_item of user.currentCollection) {

                //console.log(coll_item)
                let state = "";

                if (!coll_item.available) {
                    state = "non disponibile";
                } else if (coll_item.holder === coll_item.owner) {
                    state = "disponibile al prestito";
                } else if (coll_item.owner === user) {
                    state = "in prestito a " + coll_item.holder.name;
                } else {
                    state = "ricevuto in prestito da " + coll_item.owner.name;
                }

                const template = `<div class="card-item">
                      <div class="card__header">
                        <div class="card__picture">
                          <img src='../img/plants/${coll_item.collectable.img}' alt="plant img" class="card__picture-img">
                        </div>
            
                        <h3 class="heading-tertirary">
                          <span>${coll_item.collectable.name}</span>
                        </h3>
                      </div>
            
                      <div class="card__details">
                        <div class="card__data">
                          <svg class="card__icon">
                            <use xlink:href="../img/icons.svg#icon-map-pin"></use>
                          </svg>
                          <span>${coll_item.collectable.group}</span>
                        </div>
                        <div class="card__data">
                          <svg class="card__icon">
                            <use xlink:href="../img/icons.svg#icon-map-pin"></use>
                          </svg>
                          <span>${coll_item.collectable.origin}</span>
                        </div>
                        <div class="card__data">
                          <svg class="card__icon">
                            <use xlink:href="../img/icons.svg#icon-map-pin"></use>
                          </svg>
                          <span>${coll_item.collectable.sun}</span>
                        </div>
                        <div class="card__data">
                          <svg class="card__icon">
                            <use xlink:href="../img/icons.svg#icon-map-pin"></use>
                          </svg>
                          <span>${coll_item.collectable.water}</span>
                        </div>
                        <div class="card__data"></div>
                      </div>
            
                       <div class="item-details">
                        <a href="#" class="btn btn--green btn--small">Details</a>
                       </div>
                      <div class="card__footer">
                        <p class="card__sub-heading">${state}</p>
                      </div>
                    </div>`

                list.insertAdjacentHTML("beforeend", template);
            }

            const allitems = list.querySelectorAll("li");

            for (let item of allitems) {
                item.addEventListener("mousedown", () => {
                    item.classList.toggle("evidenzia");
                });
            }
        }

        reset();
    });