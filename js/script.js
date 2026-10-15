function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}


function filterSelection(c) {
    const cards = document.querySelectorAll(".filterDiv");

    cards.forEach(function (card) {
        if (c === "all" || card.classList.contains(c)) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }
    });

    if (gomb) {
        document.querySelectorAll("#myBtnContainer .btn")
            .forEach(function (gombElem) {
                gombElem.classList.remove("active");
            });

        gomb.classList.add("active");
    }
}

document.addEventListener("DOMContentLoaded", function () {
    filterSelection("all");
});

function belepes() {

    let nev = document.getElementById("bejelentkezve").value;

    if (nev.trim() !== "") {

        document.getElementById("belepettNev").textContent = nev.trim();

        let modalElem = document.getElementById("profilmodal");
        const modal = bootstrap.Modal.getInstance(modalElem);
        alert("sikeres mentés")


        if (modal) {
            modal.hide();
        }
    } else {
        alert("Kérlek, add meg a neved!");
    }
}

let sulyCimsor = document.getElementById("weightTitle");

let kgElem = document.getElementById("kg");
let lbElem = document.getElementById("lb");

kgElem.addEventListener("click", function () {
    sulyCimsor.textContent = "Súly mértékegysége [kg]";
});

lbElem.addEventListener("click", function () {
    sulyCimsor.textContent = "Súly mértékegysége [lbs]";
});