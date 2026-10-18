// A gyakorlatok betöltése a localStorage-ból
let edzsesek = JSON.parse(localStorage.getItem("edzsesek") || "[]").map(adat =>
    new Gyakorlatok(
        adat.nev,
        adat.izomCsoport,
        adat.nehezseg,
        adat.szettekSzama,
        adat.ismetlesekSzama,
        adat.pihenoIdo,
        adat.suly
    )
);

let aktualisIndex = -1;
let torlendoIndex = -1;
let aktivSzuro = "all";
let sulyEgyseg = localStorage.getItem("sulyEgyseg") || "kg";


// Modalos üzenet megjelenítése
function modalUzenet(cim, uzenet, fooldalGombLatszik = false) {
    const modalElem = document.getElementById("uzenetModal");

    if (!modalElem) {
        console.error("Nem található az uzenetModal elem a HTML-ben.");
        return;
    }

    const cimElem = document.getElementById("uzenetCim");
    const szovegElem = document.getElementById("uzenetSzoveg");
    const fooldalGomb = document.getElementById("fooldalGomb");

    if (cimElem) {
        cimElem.textContent = cim;
    }

    if (szovegElem) {
        szovegElem.textContent = uzenet;
    }

    if (fooldalGomb) {
        fooldalGomb.style.display = fooldalGombLatszik ? "" : "none";
        fooldalGomb.href = "fooldal.html";
    }

    bootstrap.Modal.getOrCreateInstance(modalElem).show();
}


// HTML-biztonságos szöveg
function htmlBiztonsagos(szoveg) {
    return String(szoveg ?? "").replace(/[&<>"']/g, karakter => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[karakter]);
}


// Gyakorlatok mentése a localStorage-ba
function mentesLocalStorage() {
    const adatok = edzsesek.map(gy => ({
        nev: gy.getNev(),
        izomCsoport: gy.getIzomCsoport(),
        nehezseg: gy.getNehezseg(),
        szettekSzama: gy.getSzettekSzama(),
        ismetlesekSzama: gy.getIsmetlesekSzama(),
        pihenoIdo: gy.getPihenoIdo(),
        suly: gy.getSuly()
    }));

    localStorage.setItem("edzsesek", JSON.stringify(adatok));
}


// Kép kiválasztása a gyakorlat neve alapján
function kepUtvonal(gy) {
    const nev = String(gy.getNev() || "").toLocaleLowerCase("hu");

    if (nev.includes("fekvenyom")) {
        return "kep/fekvenyomas (2).png";
    }

    if (nev.includes("guggol")) {
        return "kep/guggolas.png";
    }

    if (
        nev.includes("vállból nyom") ||
        nev.includes("vallbol nyom")
    ) {
        return "kep/vallbolnyomas.png";
    }

    return "kep/images.png";
}


// Az izomcsoport összehasonlításához használt név
function szuroKulcs(izomcsoport) {
    const izom = String(izomcsoport || "").toLocaleLowerCase("hu");

    if (izom.includes("hát") || izom.includes("hat")) {
        return "Hat";
    }

    if (izom.includes("váll") || izom.includes("vall")) {
        return "Vall";
    }

    if (izom.includes("mell")) {
        return "Mell";
    }

    if (izom.includes("láb") || izom.includes("lab")) {
        return "Lab";
    }

    if (izom.includes("kar")) {
        return "Kar";
    }

    return "Egyeb";
}


// A gyakorlat adatainak HTML-je
function gyakorlatAdatokHTML(gy) {
    const suly = sulyEgyseg === "lbs"
        ? (Number(gy.getSuly()) * 2.20462).toFixed(1)
        : gy.getSuly();

    return `
        <div class="row pt-3">

            <div class="col-6">
                <h5>Izomcsoport:</h5>
                <p class="ps-3 narancshatter">
                    ${htmlBiztonsagos(gy.getIzomCsoport())}
                </p>
            </div>

            <div class="col-6">
                <h5>Nehézség:</h5>
                <p class="ps-3 narancshatter">
                    ${htmlBiztonsagos(gy.getNehezseg())}
                </p>
            </div>

            <div class="col-6">
                <h5>Szettek száma:</h5>
                <p class="ps-3 narancshatter">
                    ${gy.getSzettekSzama()}
                </p>
            </div>

            <div class="col-6">
                <h5>Ismétlések száma:</h5>
                <p class="ps-3 narancshatter">
                    ${gy.getIsmetlesekSzama()}
                </p>
            </div>

            <div class="col-6">
                <h5>Javasolt pihenőidő:</h5>
                <p class="ps-3 narancshatter">
                    ${gy.getPihenoIdo()} másodperc
                </p>
            </div>

            <div class="col-6">
                <h5>Súly (${sulyEgyseg}):</h5>
                <p class="ps-3 narancshatter">
                    ${suly}
                </p>
            </div>

        </div>
    `;
}


// A gyakorlatkártyák létrehozása
function kiir() {
    const lista = document.getElementById("gyakorlatLista");
    const uresLista = document.getElementById("uresLista");

    if (!lista) {
        return;
    }

    lista.innerHTML = "";

    const szurtGyakorlatok = edzsesek
        .map((gy, index) => ({ gy, index }))
        .filter(({ gy }) =>
            aktivSzuro === "all" ||
            szuroKulcs(gy.getIzomCsoport()) === aktivSzuro
        );

    if (uresLista) {
        uresLista.classList.toggle(
            "d-none",
            szurtGyakorlatok.length !== 0
        );

        if (szurtGyakorlatok.length === 0 && aktivSzuro !== "all") {
            uresLista.textContent =
                "Nincs gyakorlat ebben az izomcsoportban.";
        } else {
            uresLista.textContent =
                "Még nincs elmentett gyakorlatod. Adj hozzá egyet az Új gyakorlat oldalon!";
        }
    }

    szurtGyakorlatok.forEach(({ gy, index }) => {
        const kartya = document.createElement("div");

        kartya.className =
            "col-10 col-sm-8 col-md-6 col-lg-4 mx-auto mx-md-0 filterDiv";

        kartya.innerHTML = `
            <div class="card shadow h-100 p-3 bg-dark-teal">

                <img
                    src="${htmlBiztonsagos(kepUtvonal(gy))}"
                    class="card-img-top"
                    alt="${htmlBiztonsagos(gy.getNev())}"
                    onerror="this.onerror=null; this.src='kep/images.png';">

                <div class="card-body">
                    <h3 class="text-white text-center narancshatter p-2 rounded-3">
                        ${htmlBiztonsagos(gy.getNev())}
                    </h3>
                </div>

                <div class="d-flex gap-2 flex-wrap">

                    <button
                        type="button"
                        class="btn btn-light flex-fill"
                        data-muvelet="megtekintes"
                        data-index="${index}">
                        <i class="bi bi-eye"></i> Megtekintés
                    </button>

                    <button
                        type="button"
                        class="btn btn-light flex-fill"
                        data-muvelet="szerkesztes"
                        data-index="${index}">
                        <i class="bi bi-pencil-square"></i> Szerkesztés
                    </button>

                    <button
                        type="button"
                        class="btn btn-outline-danger w-100"
                        data-muvelet="torles"
                        data-index="${index}">
                        <i class="bi bi-trash"></i> Törlés
                    </button>

                </div>

            </div>
        `;

        lista.appendChild(kartya);
    });
}


// Szűrőgombok működése
function filterSelection(filter) {
    aktivSzuro = filter;

    document.querySelectorAll(".szuro-gomb").forEach(gomb => {
        gomb.classList.toggle(
            "active",
            gomb.dataset.filter === filter
        );
    });

    kiir();
}


// Gyakorlat megtekintése
function megtekintes(index) {
    const gy = edzsesek[index];

    if (!gy) {
        return;
    }

    aktualisIndex = index;

    document.getElementById("megtekintesCim").textContent =
        gy.getNev();

    document.getElementById("megtekintesTartalom").innerHTML = `
        <img
            src="${htmlBiztonsagos(kepUtvonal(gy))}"
            class="card-img-top"
            alt="${htmlBiztonsagos(gy.getNev())}"
            onerror="this.onerror=null; this.src='kep/images.png';">

        <h3 class="text-white text-center narancshatter p-2 rounded-3 py-3 mt-3">
            ${htmlBiztonsagos(gy.getNev())}
        </h3>

        ${gyakorlatAdatokHTML(gy)}

        <button
            type="button"
            class="btn btn-light w-100"
            id="megtekintesSzerkeszt">
            <i class="bi bi-pencil-square"></i> Szerkesztés
        </button>
    `;

    document.getElementById("megtekintesSzerkeszt")
        .addEventListener("click", () => {
            bootstrap.Modal
                .getOrCreateInstance(
                    document.getElementById("megtekintes")
                )
                .hide();

            szerkesztes(aktualisIndex);
        });

    bootstrap.Modal
        .getOrCreateInstance(document.getElementById("megtekintes"))
        .show();
}


// Szerkesztőablak megnyitása
function szerkesztes(index) {
    const gy = edzsesek[index];

    if (!gy) {
        return;
    }

    aktualisIndex = index;

    document.getElementById("szerkNev").value =
        gy.getNev();

    document.getElementById("szerkIzom").value =
        gy.getIzomCsoport();

    document.getElementById("szerkNehezseg").value =
        gy.getNehezseg();

    document.getElementById("szerkSzettek").value =
        gy.getSzettekSzama();

    document.getElementById("szerkIsmetles").value =
        gy.getIsmetlesekSzama();

    document.getElementById("szerkPiheno").value =
        gy.getPihenoIdo();

    document.getElementById("szerkSuly").value =
        gy.getSuly();

    bootstrap.Modal
        .getOrCreateInstance(document.getElementById("szerkesztes"))
        .show();
}


// Törlés megerősítőablakának megnyitása
function torles(index) {
    torlendoIndex = index;

    bootstrap.Modal
        .getOrCreateInstance(document.getElementById("torlesModal"))
        .show();
}


// Kártyagombok kezelése
document.getElementById("gyakorlatLista")
    ?.addEventListener("click", event => {
        const gomb = event.target.closest("button[data-muvelet]");

        if (!gomb) {
            return;
        }

        const index = Number(gomb.dataset.index);

        if (gomb.dataset.muvelet === "megtekintes") {
            megtekintes(index);
        }

        if (gomb.dataset.muvelet === "szerkesztes") {
            szerkesztes(index);
        }

        if (gomb.dataset.muvelet === "torles") {
            torles(index);
        }
    });


// Gyakorlat törlése
document.getElementById("torlesMegerosit")
    ?.addEventListener("click", () => {
        if (
            torlendoIndex < 0 ||
            torlendoIndex >= edzsesek.length
        ) {
            return;
        }

        edzsesek.splice(torlendoIndex, 1);

        mentesLocalStorage();

        torlendoIndex = -1;

        kiir();

        bootstrap.Modal
            .getOrCreateInstance(document.getElementById("torlesModal"))
            .hide();
    });


// Meglévő gyakorlat módosításainak mentése
document.getElementById("szerkesztesForm")
    ?.addEventListener("submit", event => {
        event.preventDefault();

        if (aktualisIndex < 0 || !edzsesek[aktualisIndex]) {
            return;
        }

        const nev = document.getElementById("szerkNev").value.trim();
        const izom = document.getElementById("szerkIzom").value;
        const nehezseg = document.getElementById("szerkNehezseg").value;

        const szettek = Number(
            document.getElementById("szerkSzettek").value
        );

        const ismetles = Number(
            document.getElementById("szerkIsmetles").value
        );

        const piheno = Number(
            document.getElementById("szerkPiheno").value
        );

        const suly = Number(
            document.getElementById("szerkSuly").value
        );

        if (
            !nev ||
            !izom ||
            !nehezseg ||
            !Number.isFinite(szettek) ||
            szettek < 0 || szettek > 150 ||
            !Number.isFinite(ismetles) ||
            ismetles < 0 || ismetles > 50 ||
            !Number.isFinite(piheno) ||
            piheno < 0 || piheno > 30 ||
            !Number.isFinite(suly) ||
            suly < 0 || suly > 300
        ) {
            modalUzenet(
                "Hibás adatok",
                "Ellenőrizd a mezőket és a megengedett számértékeket!"
            );
            return;
        }

        edzsesek[aktualisIndex] = new Gyakorlatok(
            nev,
            izom,
            nehezseg,
            szettek,
            ismetles,
            piheno,
            suly
        );

        mentesLocalStorage();
        kiir();

        bootstrap.Modal
            .getOrCreateInstance(document.getElementById("szerkesztes"))
            .hide();

        modalUzenet(
            "Sikeres módosítás",
            "A gyakorlat adatai sikeresen módosultak."
        );
    });


// Új gyakorlat mentése az Új gyakorlat oldalon
const mentesGomb = document.querySelector(".mentes");

if (mentesGomb) {
    mentesGomb.addEventListener("click", event => {
        event.preventDefault();

        const form = document.querySelector("form");

        const nev =
            document.querySelector(".nev")?.value.trim() || "";

        const izom =
            document.querySelector("#izomCsoport")?.value || "";

        const nehezseg =
            document.querySelector("#nehezseg")?.value || "";

        const szettek =
            document.querySelector("#szettek")?.value ?? "";

        const ismetles =
            document.querySelector("#ismetles")?.value ?? "";

        const piheno =
            document.querySelector("#pihenoido")?.value ?? "";

        const suly =
            document.querySelector("#suly")?.value ?? "";

        if (
            !nev ||
            !izom ||
            izom.toLowerCase() === "válassz" ||
            !nehezseg ||
            szettek === "" ||
            ismetles === "" ||
            piheno === "" ||
            suly === ""
        ) {
            modalUzenet(
                "Hiányzó adatok",
                "Kérlek, tölts ki minden mezőt!"
            );
            return;
        }

        const szamok = [
            Number(szettek),
            Number(ismetles),
            Number(piheno),
            Number(suly)
        ];

        if (
            szamok.some(szam => !Number.isFinite(szam) || szam < 0) ||
            szamok[0] > 150 ||
            szamok[1] > 50 ||
            szamok[2] > 30 ||
            szamok[3] > 300
        ) {
            modalUzenet(
                "Hibás számértékek",
                "Ellenőrizd a számokat! Maximum: 150 szett, 50 ismétlés, 30 másodperc pihenő és 300 kg."
            );
            return;
        }

        const gy = new Gyakorlatok(
            nev,
            izom,
            nehezseg,
            szamok[0],
            szamok[1],
            szamok[2],
            szamok[3]
        );

        edzsesek.push(gy);

        mentesLocalStorage();

        if (form) {
            form.reset();
        }

        modalUzenet(
            "Sikeres mentés",
            "A gyakorlat sikeresen mentve! A főoldalon megtekintheted az elmentett gyakorlatot.",
            true
        );
    });
}


// Oldalsó menü megnyitása
function openNav() {
    const nav = document.getElementById("mySidenav");

    if (nav) {
        nav.style.width = "250px";
    }
}


// Oldalsó menü bezárása
function closeNav() {
    const nav = document.getElementById("mySidenav");

    if (nav) {
        nav.style.width = "0";
    }
}


// Profilnév megjelenítése, ha el van mentve
const profilNev = localStorage.getItem("belepettNev");

if (profilNev && document.getElementById("belepettNev")) {
    document.getElementById("belepettNev").textContent = profilNev;
}


// Súlyegység beállítása
function beallitSulyEgyseg(egyseg) {
    sulyEgyseg = egyseg;

    localStorage.setItem("sulyEgyseg", egyseg);

    const gomb = document.getElementById("sulyEgysegGomb");
    const cim = document.getElementById("weightTitle");

    if (gomb) {
        gomb.textContent = egyseg;
    }

    if (cim) {
        cim.textContent = `Súly mértékegysége [${egyseg}]`;
    }

    kiir();
}


document.getElementById("kg")?.addEventListener("click", event => {
    event.preventDefault();
    beallitSulyEgyseg("kg");
});


document.getElementById("lb")?.addEventListener("click", event => {
    event.preventDefault();
    beallitSulyEgyseg("lbs");
});


// Kezdeti betöltés 
beallitSulyEgyseg(sulyEgyseg);
kiir();