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

const hibaElem = document.querySelector(".modalHiba");
const sikerElem = document.querySelector(".modalSiker");

const hibaModal = hibaElem ? new bootstrap.Modal(hibaElem) : null;
const sikerModal = sikerElem ? new bootstrap.Modal(sikerElem) : null;

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

function htmlBiztonsagos(szoveg) {
    return String(szoveg).replace(/[&<>"']/g, karakter => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[karakter]);
}

function kiir() {
    const lista = document.querySelector(".listaidk");

    if (!lista) return;

    lista.innerHTML = "";

    edzsesek.forEach(gy => {
        lista.innerHTML += `
            <div class="accordion accordion-flush col-2 gy-5" id="accordionFlushExample">
  <div class="accordion-item">
    <h2 class="accordion-header">
     
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
      <h3>${htmlBiztonsagos(gy.getNev())}</h3></button>
    </h2>
    <div id="flush-collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body"> <p>Izomcsoport: ${htmlBiztonsagos(gy.getIzomCsoport())}</p>
                <p>Nehézség: ${htmlBiztonsagos(gy.getNehezseg())}</p>
                <p>Szettek száma: ${gy.getSzettekSzama()}</p>
                <p>Ismétlések száma: ${gy.getIsmetlesekSzama()}</p>
                <p>Pihenőidő: ${gy.getPihenoIdo()} perc</p>
                <p>Súly: ${gy.getSuly()} kg</p></div>
                <i class="bi bi-trash text-danger" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="torol(${i})"></i>
    </div>
  </div>
  </div>
        `;
    });
}
function torol(index){
  torlendo = index;

}
document.querySelector(".torles").addEventListener('click', () => {
  cipok.splice(torlendo, 1);
  kiir();
  
});
const mentesGomb = document.querySelector(".mentes");

if (mentesGomb) {
    mentesGomb.addEventListener("click", () => {
        const nev = document.querySelector(".nev").value.trim();
        const izom = document.querySelector("#izomCsoport").value;
        const nehezseg = document.querySelector("#nehezseg").value;
        const szettek = document.querySelector("#szettek").value;
        const ismetles = document.querySelector("#ismetles").value;
        const piheno = document.querySelector("#pihenoido").value;
        const suly = document.querySelector("#suly").value;

        if (
            !nev ||
            izom === "válassz" ||
            !nehezseg ||
            szettek === "" ||
            ismetles === "" ||
            piheno === "" ||
            suly === ""
        ) {
            if (hibaModal) {
                hibaModal.show();
            } else {
                alert("Kérlek, tölts ki minden mezőt!");
            }
            return;
        }
        const gy = new Gyakorlatok(
            nev,
            izom,
            nehezseg,
            Number(szettek),
            Number(ismetles),
            Number(piheno),
            Number(suly)
        );
        edzsesek.push(gy);
        mentesLocalStorage();
        kiir();
        document.querySelector("form").reset();
        if (sikerModal) {
            sikerModal.show();
        }
    });
}
kiir();
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}
