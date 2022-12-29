// Once downloaded all data, the application is initialized using the createApp() function

import {createApp} from "./load-data.js";


const hideAlert = () => {
    const el = document.querySelector('.alert');
    if (el) el.parentElement.removeChild(el);
};

const showAlert = (type, msg, time= 5) => {
    hideAlert();
    const markup = `<div class="alert alert--${type}">${msg}</div>`;
    document.querySelector('.collection').insertAdjacentHTML('afterbegin', markup);
    window.setTimeout(hideAlert, time * 1000);
};


createApp()
    .then((app) => {

        const userButtons = document.querySelector(".user-buttons");

        const allUsersName = Object.keys(app.users);
        const firstUser = allUsersName[0];
        let user = app.users[firstUser];

        const userButtonsText = allUsersName.map(name => `<p user-name="${name}" class="nav__el nav__el--cta">${name}</p>`);
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
                init_profile(user);
            });
        }

        const appLogo = document.querySelector(".logo__icon");
        appLogo.addEventListener("click", (e) => {
            const home = document.querySelector(".home");
            home.style.display = 'flex';
            const main = document.querySelector(".collection");
            main.style.display = 'none';
            const nav = document.querySelector(".second-nav");
            nav.style.display = 'none';

            for (const p of mainNavButtons) {
                p.classList.remove("selected");
            }
        });

        function init_profile(user) {
            const home = document.querySelector(".home");
            home.style.display = 'none';
            const nav = document.querySelector(".second-nav");
            nav.style.display = 'flex';

            const navButtons = document.querySelector(".nav-buttons");
            const navButton = navButtons.querySelectorAll("li");

            let i = 0
            while (i < navButton.length) {
                if (i == 0) {
                    navButton[i].classList.add("selected");
                } else {
                    navButton[i].classList.remove("selected")
                }
                i++
            }

            profilo(user)

            for (const b of navButton) {
                if (b.innerHTML === "User profile") {
                    b.addEventListener("click", () => {
                        const all = b.parentElement.children;
                        for (const child of all) {
                            if (child !== b) {
                                child.classList.remove("selected")
                            } else {
                                child.classList.add("selected")
                            }
                        }
                        profilo(user);
                    })
                } else if (b.innerHTML === "Collection") {
                    b.addEventListener("click", () => {
                        const all = b.parentElement.children;
                        for (const child of all) {
                            if (child !== b) {
                                child.classList.remove("selected")
                            } else {
                                child.classList.add("selected")
                            }
                        }
                        collezione_attuale(user);
                    })
                } else if (b.innerHTML === "Available plants") {
                    b.addEventListener("click", () => {
                        const all = b.parentElement.children;
                        for (const child of all) {
                            if (child !== b) {
                                child.classList.remove("selected")
                            } else {
                                child.classList.add("selected")
                            }
                        }
                        piante_disponibili(user);
                    })
                } else if (b.innerHTML === "Plants on loan") {
                    b.addEventListener("click", () => {
                        const all = b.parentElement.children;
                        for (const child of all) {
                            if (child !== b) {
                                child.classList.remove("selected")
                            } else {
                                child.classList.add("selected")
                            }
                        }
                        piante_prestate(user);
                    })
                }
            }
        }

        function profilo(user) {
            const main = document.querySelector(".collection");
            main.style.display = 'none';
            const profile = document.querySelector(".profilo");
            profile.style.display = 'flex';

            <!--PER LORENZO: il codice js della pagina del profilo va messo qui. -->
        }


        function collezione_attuale(user) {

            const profile = document.querySelector(".profilo");
            profile.style.display = 'none';
            const main = document.querySelector(".collection");
            main.style.display = 'flex';

            const title = document.querySelector(".collection-title");
            title.innerText = user.name + "'s Collection";

            const list = document.querySelector(".collection-content");
            list.innerHTML = "";

            for (let coll_item of user.currentCollection) {

                let state = "";

                if (!coll_item.available) {
                    state = "Not available";
                } else if (coll_item.holder === coll_item.owner) {
                    state = "Available";
                } else if (coll_item.owner === user) {
                    state = "On loan to " + coll_item.holder.name;
                } else {
                    state = "Received on loan from " + coll_item.owner.name;
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
                            <use xlink:href="../img/icons.svg#icon-plant"></use>
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
                            <use xlink:href="../img/icons.svg#icon-sun"></use>
                          </svg>
                          <span>${coll_item.collectable.sun}</span>
                        </div>
                        <div class="card__data">
                          <svg class="card__icon">
                            <use xlink:href="../img/icons.svg#icon-water"></use>
                          </svg>
                          <span>${coll_item.collectable.water}</span>
                        </div>
                        <div class="card__data"></div>
                      </div>
                      <div class="card__footer">
                        <p class="card__sub-heading">${state}</p>
                      </div>
                        <div class="overlay">
                        <div class="overlay-title"><strong>Description</strong></div>
                        <div class="overlay-text">${coll_item.collectable.description}</div>
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

        function piante_disponibili(user) {
            const profile = document.querySelector(".profilo");
            profile.style.display = 'none';
            const main = document.querySelector(".collection");
            main.style.display = 'flex';

            const title = document.querySelector(".collection-title");
            title.innerText = "Available Plants";

            const list = document.querySelector(".collection-content");
            list.innerHTML = "";

            for (let u of allUsersName) {

                const collectUser = app.users[u];

                if (collectUser.name !== user.name && collectUser.constructor.name === "Collector") {
                    for (let coll_item of collectUser.availableItems) {

                        let state = "Available from " + u;

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
                            <use xlink:href="../img/icons.svg#icon-plant"></use>
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
                            <use xlink:href="../img/icons.svg#icon-sun"></use>
                          </svg>
                          <span>${coll_item.collectable.sun}</span>
                        </div>
                        <div class="card__data">
                          <svg class="card__icon">
                            <use xlink:href="../img/icons.svg#icon-water"></use>
                          </svg>
                          <span>${coll_item.collectable.water}</span>
                        </div>
                        <div class="card__data"></div>
                      </div>
                       <div class="item-details">
                        <p class="btn btn--green btn--small loan-btn" owner="${u}" item="${coll_item.collectable.name}">Borrow</p>
                       </div>
                      <div class="card__footer">
                        <p class="card__sub-heading">${state}</p>
                      </div>
                    </div>`

                        list.insertAdjacentHTML("beforeend", template);
                    }
                } else continue
            }

            const allitems = list.querySelectorAll(".card-item");

            for (let item of allitems) {
                item.addEventListener("mousedown", () => {
                    item.classList.toggle("evidenzia");
                });
            }

            const allButtons = document.querySelectorAll(".loan-btn");
            for (const p of allButtons) {
                p.addEventListener("click", (e) => {
                    const owner = p.getAttribute("owner");
                    const item = p.getAttribute("item");
                    const itemOwner = app.users[owner];

                    itemOwner.loan(app.plants[item], user);

                    showAlert('success', `${item} borrowed from ${user.name}`,2);
                    window.setTimeout(() => {
                        piante_disponibili(user)
                    }, 1500);
                });
            }
        }

        function piante_prestate(user) {
            const profile = document.querySelector(".profilo");
            profile.style.display = 'none';
            const main = document.querySelector(".collection");
            main.style.display = 'flex';

            const title = document.querySelector(".collection-title");
            title.innerText = "On loan plants";

            const list = document.querySelector(".collection-content");
            list.innerHTML = "";

            for (let coll_item of user.onLoanItems) {

                if (coll_item.owner === user) {
                    let state = "On loan to " + coll_item.holder.name;

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
                            <use xlink:href="../img/icons.svg#icon-plant"></use>
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
                            <use xlink:href="../img/icons.svg#icon-sun"></use>
                          </svg>
                          <span>${coll_item.collectable.sun}</span>
                        </div>
                        <div class="card__data">
                          <svg class="card__icon">
                            <use xlink:href="../img/icons.svg#icon-water"></use>
                          </svg>
                          <span>${coll_item.collectable.water}</span>
                        </div>
                        <div class="card__data"></div>
                      </div>
                       <div class="item-details">
                        <p class="btn btn--green btn--small takeBack-btn" item="${coll_item.collectable.name}">Take it back</p>
                       </div>
                      <div class="card__footer">
                        <p class="card__sub-heading">${state}</p>
                      </div>
                    </div>`

                    list.insertAdjacentHTML("beforeend", template);
                }
            }

            const allitems = list.querySelectorAll("li");

            for (let item of allitems) {
                item.addEventListener("mousedown", () => {
                    item.classList.toggle("evidenzia");
                });
            }

            const allButtons = document.querySelectorAll(".takeBack-btn");
            for (const p of allButtons) {
                p.addEventListener("click", (e) => {
                    const item = p.getAttribute("item");

                    user.takeBack(app.plants[item]);

                    showAlert('success', `${item} taken back from ${user.name}`,2);
                    window.setTimeout(() => {
                        piante_prestate(user)
                    }, 1500);

                });
            }
        }
    });