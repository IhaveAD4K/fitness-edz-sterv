
let edzsesek = [];

const mentettAdatok = JSON.parse(
    localStorage.getItem("edzsesek") || "[]"
);

edzsesek = mentettAdatok.map(adat =>
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

    localStorage.setItem(
        "edzsesek",
        JSON.stringify(adatok)
    );
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
    const listaidk = document.querySelector(".listaidk");

    if (!listaidk) return;

    listaidk.innerHTML = "";

    edzsesek.forEach(gy => {
        listaidk.innerHTML += `
            <div class="card mb-3 p-3">
                <h3>${htmlBiztonsagos(gy.getNev())}</h3>
                <p>Izomcsoport:
                    ${htmlBiztonsagos(gy.getIzomCsoport())}
                </p>
                <p>Nehézség:
                    ${htmlBiztonsagos(gy.getNehezseg())}
                </p>
                <p>Szettek száma: ${gy.getSzettekSzama()}</p>
                <p>Ismétlések száma:
                    ${gy.getIsmetlesekSzama()}
                </p>
                <p>Pihenőidő: ${gy.getPihenoIdo()} perc</p>
                <p>Súly: ${gy.getSuly()} kg</p>
            </div>
        `;
    });
}


const mentesGomb = document.querySelector(".mentes");

if (mentesGomb) {
    mentesGomb.addEventListener("click", () => {
        const nev = document.querySelector(".nev");
        const izomCsoport =
            document.querySelector("#izomCsoport");
        const nehezseg =
            document.querySelector("#nehezseg");
        const szettek =
            document.querySelector("#szettek");
        const ismetles =
            document.querySelector("#ismetles");
        const pihenoido =
            document.querySelector("#pihenoido");
        const suly = document.querySelector("#suly");

        if (
            !nev.value.trim() ||
            izomCsoport.value === "válassz" ||
            !nehezseg.value ||
            szettek.value === "" ||
            ismetles.value === "" ||
            pihenoido.value === "" ||
            suly.value === ""
        ) {
            alert("Kérlek, tölts ki minden mezőt!");
            return;
        }

        const gy = new Gyakorlatok(
            nev.value.trim(),
            izomCsoport.value,
            nehezseg.value,
            Number(szettek.value),
            Number(ismetles.value),
            Number(pihenoido.value),
            Number(suly.value)
        );

        edzsesek.push(gy);

        mentesLocalStorage();

        kiir();

        nev.value = "";
        izomCsoport.selectedIndex = 0;
        szettek.value = "";
        ismetles.value = "";
        pihenoido.value = "";
        suly.value = "";

        alert("A gyakorlat mentése sikeres!");
    });
}

kiir();

function openNav() {
<<<<<<< HEAD
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}
=======
     document.getElementById("mySidenav").style.width = "250px"; 
} 
     
function closeNav() { 
    document.getElementById("mySidenav").style.width = "0"; 
} 

function kiir(){
    var e = document.querySelector(".e");
    e.innerHTML="";
    for(let i =0; i< edzsesek.length; i++ ){
        e.innerHTML+=``;
    }
}

document.querySelector(".mentes").addEventListener("click", ()=>{
       var nev = document.querySelector(".nev");
    var izomCsoport = document.querySelector(".izomCsoport");
    var nehezseg = document.querySelector(".nehezseg");
     var szettekSzama = document.querySelector(".szettekSzama");
    var ismetlesekSzama = document.querySelector(".ismetlesekSzama");
    var pihenoIdo = document.querySelector(".pihenoIdo");
    var suly = document.querySelector(".suly")
    var gy = new Gyakorlatok(nev.value, izomCsoport.value, nehezseg.value, parseInt(szettekSzama).value, parseInt(ismetlesekSzama).value, parseInt(pihenoIdo).value, parseInt(suly).value);

    nev.value = izomCsoport.value = nehezseg.value = parseInt(szettekSzama).value = parseInt(ismetlesekSzama).value = parseInt(pihenoIdo).value = parseInt(suly).value = "";
    edzsesek.push(gy);
    kiir();
  
});
/*
var nev = document.querySelector(".nev");
    var izomCsoport = document.querySelector(".izomCsoport");
    var nehezseg = document.querySelector(".nehezseg");
     var szettekSzama = document.querySelector(".szettekSzama");
    var ismetlesekSzama = document.querySelector(".ismetlesekSzama");
    var pihenoIdo = document.querySelector(".pihenoIdo");
    var suly = document.querySelector(".suly")
    var gyakorlatokForm = document.querySelector(".gyakorlatokform")
    
    gyakorlatokForm.addEventListener('.mentes', function(event){
        event.preventDefault();
        if(gyakorlatokForm.ariaValueMax.length <1) return;

        gyakorlatokForm.innerHTML+= '<li>' + nev.value + '</li>'
                                        '<li>' + izomCsoport.value + '</li>'
                                        '<li>' + nehezseg.value + '</li>'
                                        '<li>' + szettekSzama.value + '</li>'
                                        '<li>' + ismetlesekSzama.value + '</li>'
                                        '<li>' + pihenoIdo.value + '</li>'
                                        '<li>' + suly.value + '</li>';
                                        gyakorlatokForm.value = "";
                                        
    }. false);

var mentett = localStorage.getItem('gyakorlatokForm');
if(saved){
    gyakorlatokForm.innerHTML = saved;
}

*/
>>>>>>> 2491d581c1d902f452ecb263eeda8a845982cd1e
