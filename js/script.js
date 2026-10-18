let edzsesek = [];

try {
    const taroltAdatok = JSON.parse(
        localStorage.getItem("edzsesek") || "[]"
    );

    if (Array.isArray(taroltAdatok)) {
        edzsesek = taroltAdatok.map(adat =>
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
    }
} catch (hiba) {
    console.error("Nem sikerült betölteni a gyakorlatokat:", hiba);
    edzsesek = [];
}

let aktualisIndex = -1;
let torlendoIndex = -1;
let aktivSzuro = "all";
let sulyEgyseg = localStorage.getItem("sulyEgyseg") || "kg";

function modalUzenet(cim, uzenet, fooldalGombLatszik = false) {
    const modalElem = document.getElementById("uzenetModal");

    if (!modalElem) {
        alert(cim + "\n\n" + uzenet);
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
        fooldalGomb.classList.toggle(
            "d-none",
            !fooldalGombLatszik
        );

        fooldalGomb.href = "fooldal.html";
    }

    if (typeof bootstrap !== "undefined") {
        bootstrap.Modal.getOrCreateInstance(modalElem).show();
    } else {
        alert(cim + "\n\n" + uzenet);
    }
}

function htmlBiztonsagos(szoveg) {
    return String(szoveg ?? "").replace(/[&<>"']/g, karakter => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[karakter]);
}

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

function kepUtvonal(gy) {
    const izom = String(gy.getIzomCsoport() || "")
        .toLocaleLowerCase("hu")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

    if (izom.includes("kar") || izom.includes("mell")) {
        return "kep/fekvenyomas.png";
    }

    if (izom.includes("lab")) {
        return "kep/guggolas.png";
    }

    if (izom.includes("hat")) {
        return "kep/rudasevezés.png";
    }

    if (izom.includes("vall")) {
        return "kep/vallbolnyomas.png";
    }

    return "kep/fekvenyomas.png";
}
function szuroKulcs(izomcsoport) {
    const izom = String(izomcsoport || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();

    if (izom === "hat") {
        return "Hat";
    }

    if (izom === "vall") {
        return "Vall";
    }

    if (izom === "mell") {
        return "Mell";
    }

    if (izom === "lab") {
        return "Lab";
    }

    if (izom === "kar") {
        return "Kar";
    }

    return "Egyeb";
}

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

const mentesForm = document.getElementById("ujGyakorlatForm");

if (mentesForm) {
    mentesForm.addEventListener("submit", event => {
        event.preventDefault();

        const nevElem = document.querySelector(".nev");
        const izomElem = document.getElementById("izomCsoport");
        const nehezsegElem = document.getElementById("nehezseg");
        const szettekElem = document.getElementById("szettek");
        const ismetlesElem = document.getElementById("ismetles");
        const pihenoElem = document.getElementById("pihenoido");
        const sulyElem = document.getElementById("suly");

        if (
            !nevElem ||
            !izomElem ||
            !nehezsegElem ||
            !szettekElem ||
            !ismetlesElem ||
            !pihenoElem ||
            !sulyElem
        ) {
            console.error(
                "Hiányzó HTML-mező. Ellenőrizd az űrlap elemeinek ID-it."
            );

            modalUzenet(
                "Hiba",
                "Az űrlap egyik mezője nem található. Ellenőrizd a HTML-ben az ID-ket."
            );

            return;
        }

        const nev = nevElem.value.trim();
        const izom = izomElem.value;
        const nehezseg = nehezsegElem.value;
        const szettekSzoveg = szettekElem.value;
        const ismetlesSzoveg = ismetlesElem.value;
        const pihenoSzoveg = pihenoElem.value;
        const sulySzoveg = sulyElem.value;

        if (
            !nev ||
            !izom ||
            izom.toLowerCase() === "válassz" ||
            izom.toLowerCase() === "valassz" ||
            !nehezseg ||
            nehezseg.toLowerCase() === "válassz" ||
            nehezseg.toLowerCase() === "valassz" ||
            szettekSzoveg === "" ||
            ismetlesSzoveg === "" ||
            pihenoSzoveg === "" ||
            sulySzoveg === ""
        ) {
            modalUzenet(
                "Hiányzó adatok",
                "Kérlek, tölts ki minden mezőt a mentés előtt!"
            );

            return;
        }

        const szettek = Number(szettekSzoveg);
        const ismetles = Number(ismetlesSzoveg);
        const piheno = Number(pihenoSzoveg);
        const suly = Number(sulySzoveg);

        if (
            !Number.isInteger(szettek) ||
            szettek < 1 ||
            szettek > 150 ||
            !Number.isInteger(ismetles) ||
            ismetles < 1 ||
            ismetles > 50 ||
            !Number.isInteger(piheno) ||
            piheno < 0 ||
            piheno > 30 ||
            !Number.isFinite(suly) ||
            suly < 0 ||
            suly > 300
        ) {
            modalUzenet(
                "Hibás adatok",
                "Szettek: 1–150, ismétlések: 1–50, pihenő: 0–30 másodperc, súly: 0–300 kg."
            );

            return;
        }

        const gyakorlat = new Gyakorlatok(
            nev,
            izom,
            nehezseg,
            szettek,
            ismetles,
            piheno,
            suly
        );

        edzsesek.push(gyakorlat);
        mentesLocalStorage();
        mentesForm.reset();

        modalUzenet(
            "Sikeres mentés!",
            "A gyakorlat el lett mentve. A főoldalon megtekintheted.",
            true
        );
    });
}

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

        if (
            szurtGyakorlatok.length === 0 &&
            aktivSzuro !== "all"
        ) {
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
            "col-10 col-sm-8 col-md-6 col-lg-4 pb-4 mx-auto mx-md-0 filterDiv";

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

function megtekintes(index) {
    const gy = edzsesek[index];

    if (!gy) {
        return;
    }

    const cimElem = document.getElementById("megtekintesCim");
    const tartalomElem = document.getElementById("megtekintesTartalom");
    const modalElem = document.getElementById("megtekintes");

    if (!cimElem || !tartalomElem || !modalElem) {
        console.error("A megtekintéshez szükséges modal nem található.");
        return;
    }

    aktualisIndex = index;
    cimElem.textContent = gy.getNev();

    tartalomElem.innerHTML = `
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

    document
        .getElementById("megtekintesSzerkeszt")
        .addEventListener("click", () => {
            bootstrap.Modal
                .getOrCreateInstance(modalElem)
                .hide();

            szerkesztes(aktualisIndex);
        });

    bootstrap.Modal
        .getOrCreateInstance(modalElem)
        .show();
}

function szerkesztes(index) {
    const gy = edzsesek[index];

    if (!gy) {
        return;
    }

    const modalElem = document.getElementById("szerkesztes");

    if (!modalElem) {
        console.error("A szerkesztés modal nem található.");
        return;
    }

    aktualisIndex = index;

    const mezok = {
        szerkNev: gy.getNev(),
        szerkIzom: gy.getIzomCsoport(),
        szerkNehezseg: gy.getNehezseg(),
        szerkSzettek: gy.getSzettekSzama(),
        szerkIsmetles: gy.getIsmetlesekSzama(),
        szerkPiheno: gy.getPihenoIdo(),
        szerkSuly: gy.getSuly()
    };

    for (const [id, ertek] of Object.entries(mezok)) {
        const elem = document.getElementById(id);

        if (elem) {
            elem.value = ertek;
        }
    }

    bootstrap.Modal
        .getOrCreateInstance(modalElem)
        .show();
}

function torles(index) {
    if (!edzsesek[index]) {
        return;
    }

    const modalElem = document.getElementById("torlesModal");

    if (!modalElem) {
        console.error("A törlés modal nem található.");
        return;
    }

    torlendoIndex = index;

    bootstrap.Modal
        .getOrCreateInstance(modalElem)
        .show();
}

document.getElementById("gyakorlatLista")
    ?.addEventListener("click", event => {
        const gomb = event.target.closest("button[data-muvelet]");

        if (!gomb) {
            return;
        }

        const index = Number(gomb.dataset.index);

        if (gomb.dataset.muvelet === "megtekintes") {
            megtekintes(index);
        } else if (gomb.dataset.muvelet === "szerkesztes") {
            szerkesztes(index);
        } else if (gomb.dataset.muvelet === "torles") {
            torles(index);
        }
    });

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

        const modalElem = document.getElementById("torlesModal");

        if (modalElem) {
            bootstrap.Modal
                .getOrCreateInstance(modalElem)
                .hide();
        }
    });

document.getElementById("szerkesztesForm")
    ?.addEventListener("submit", event => {
        event.preventDefault();

        if (
            aktualisIndex < 0 ||
            !edzsesek[aktualisIndex]
        ) {
            return;
        }

        const nev = document.getElementById("szerkNev").value.trim();
        const izom = document.getElementById("szerkIzom").value;
        const nehezseg = document.getElementById("szerkNehezseg").value;

        const szettekSzoveg =
            document.getElementById("szerkSzettek").value;

        const ismetlesSzoveg =
            document.getElementById("szerkIsmetles").value;

        const pihenoSzoveg =
            document.getElementById("szerkPiheno").value;

        const sulySzoveg =
            document.getElementById("szerkSuly").value;

        if (
            !nev ||
            !izom ||
            !nehezseg ||
            szettekSzoveg === "" ||
            ismetlesSzoveg === "" ||
            pihenoSzoveg === "" ||
            sulySzoveg === ""
        ) {
            modalUzenet(
                "Hiányzó adatok",
                "Kérlek, tölts ki minden mezőt!"
            );

            return;
        }

        const szettek = Number(szettekSzoveg);
        const ismetles = Number(ismetlesSzoveg);
        const piheno = Number(pihenoSzoveg);
        const suly = Number(sulySzoveg);

        if (
            !Number.isInteger(szettek) ||
            szettek < 1 ||
            szettek > 150 ||
            !Number.isInteger(ismetles) ||
            ismetles < 1 ||
            ismetles > 50 ||
            !Number.isInteger(piheno) ||
            piheno < 0 ||
            piheno > 30 ||
            !Number.isFinite(suly) ||
            suly < 0 ||
            suly > 300
        ) {
            modalUzenet(
                "Hibás adatok",
                "Szettek: 1–150, ismétlések: 1–50, pihenő: 0–30 másodperc, súly: 0–300 kg."
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

        const modalElem = document.getElementById("szerkesztes");

        if (modalElem) {
            bootstrap.Modal
                .getOrCreateInstance(modalElem)
                .hide();
        }

        modalUzenet(
            "Sikeres módosítás",
            "A gyakorlat adatai sikeresen módosultak."
        );
    });

function openNav() {
    const nav = document.getElementById("mySidenav");

    if (nav) {
        nav.style.width = "250px";
    }
}

function closeNav() {
    const nav = document.getElementById("mySidenav");

    if (nav) {
        nav.style.width = "0";
    }
}

const profilNev = localStorage.getItem("belepettNev");
const profilNevElem = document.getElementById("belepettNev");

if (profilNev && profilNevElem) {
    profilNevElem.textContent = profilNev;
}

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

beallitSulyEgyseg(sulyEgyseg);
kiir();