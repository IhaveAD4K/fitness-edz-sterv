
var szerkesztendo = -1;
var torlendo = -1;

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

function htmlBiztonsagos(szoveg) {
    return String(szoveg).replace(/[&<>"']/g, karakter => ({
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

function kiir() {
    const lista = document.querySelector(".listaidk");

    if (!lista) return;

    lista.innerHTML = "";

    edzsesek.forEach((gy, i) => {
        const collapseId = "gyakorlat-" + i;

        lista.innerHTML += `
            <div class="col-12 col-md-6 col-lg-4 mb-4">
                <div class="accordion accordion-flush">
                    <div class="accordion-item">

                        <h2 class="accordion-header">
                            <button
                                class="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#${collapseId}"
                                aria-expanded="false"
                                aria-controls="${collapseId}">

                                <h5 class="mb-0">
                                    ${htmlBiztonsagos(gy.getNev())}
                                </h5>
                            </button>
                        </h2>

                        <div
                            id="${collapseId}"
                            class="accordion-collapse collapse">

                            <div class="accordion-body">
                                <p>Izomcsoport: ${htmlBiztonsagos(gy.getIzomCsoport())}</p>
                                <p>Nehézség: ${htmlBiztonsagos(gy.getNehezseg())}</p>
                                <p>Szettek száma: ${gy.getSzettekSzama()}</p>
                                <p>Ismétlések száma: ${gy.getIsmetlesekSzama()}</p>
                                <p>Pihenőidő: ${gy.getPihenoIdo()} másodperc</p>
                                <p>Súly: ${gy.getSuly()} kg</p>

                                <button
                                    type="button"
                                    class="btn btn-outline-danger"
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal"
                                    onclick="torol(${i})">

                                    <i class="bi bi-trash"></i>
                                    Törlés
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        `;
    });
}

function torol(index) {
    torlendo = index;
}

const torlesGomb = document.querySelector(".torles");

if (torlesGomb) {
    torlesGomb.addEventListener("click", () => {
        if (torlendo < 0 || torlendo >= edzsesek.length) {
            return;
        }

        edzsesek.splice(torlendo, 1);

        mentesLocalStorage();
        kiir();

        torlendo = -1;
    });
}

const mentesGomb = document.querySelector(".mentes");

if (mentesGomb) {
    mentesGomb.addEventListener("click", () => {
        const form = document.querySelector("form");

        const nev = document.querySelector(".nev")?.value.trim() || "";
        const izom = document.querySelector("#izomCsoport")?.value || "";
        const nehezseg = document.querySelector("#nehezseg")?.value || "";
        const szettek = document.querySelector("#szettek")?.value ?? "";
        const ismetles = document.querySelector("#ismetles")?.value ?? "";
        const piheno = document.querySelector("#pihenoido")?.value ?? "";
        const suly = document.querySelector("#suly")?.value ?? "";

        if (
            !nev ||
            !izom ||
            izom === "válassz" ||
            !nehezseg ||
            szettek === "" ||
            ismetles === "" ||
            piheno === "" ||
            suly === ""
        ) {
            alert("Kérlek, tölts ki minden mezőt!");
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
            alert("Ellenőrizd a számokat! A megengedett maximális értékek: 150 szett, 50 ismétlés, 30 másodperc pihenő és 300 kg.");
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

        alert("A gyakorlat sikeresen mentve!");

    });
}
kiir();

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}


function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}
